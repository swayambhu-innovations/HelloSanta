import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { delay, last, switchMap } from 'rxjs/operators';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-pending-product-edit-modal',
  templateUrl: './pending-product-edit-modal.component.html',
  styleUrls: ['./pending-product-edit-modal.component.scss'],
})
export class PendingProductEditModalComponent implements OnInit {
  @Input() productId: string;
  prodImagesBackend = [];
  customSelections = {};
  prodImagesEvents = {};
  form: FormGroup;
  productName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  productDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(200),
    Validators.maxLength(1000),
  ]);
  shortDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(30),
    Validators.maxLength(200),
  ]);
  seoDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(50),
    Validators.maxLength(160),
  ]);
  productPrice: FormControl = new FormControl('', [Validators.required]);
  vendorId: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]*'),
  ]);
  totalStock: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(5),
  ]);
  customisationsCount: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
  ]);
  productImagesCount: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(2),
  ]);
  isLoading: boolean = false;
  customTypeChanged(value, item) {
    console.log(value);
  }
  toggleChange(value) {
    this.dataProvider.showOverlay = value;
  }
  checkFields() {
    let dtx = '';
    let nump = 0;
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        dtx += name + ', ';
        nump++;
      }
    }
    if (nump > 0) {
      this.authService.presentToast(
        'There are some problems with fields ' + dtx + ''
      );
    } else {
      this.authService.presentToast('All fields are valid. Go Ahead !');
    }
  }
  loadFile(event, count) {
    var image = document.getElementById(count) as HTMLImageElement;
    image.src = URL.createObjectURL(event.target.files[0]);
    if (event.target.files[0].size > 500000) {
      this.authService.presentToast('File is greater than 500 KB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      this.fileChange(event);
      this.customSelections[count] = event;
    }
  }
  loadProdImage(event, count) {
    var image = document.getElementById(count) as HTMLImageElement;
    if (event.target.files[0].size > 500000) {
      this.authService.presentToast('File is greater than 500 KB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      this.fileChange(event);
      this.prodImagesEvents[count] = event;
    }
  }
  uploadFile(file, fileName) {
    console.log('Starting file upload', fileName);
    const fileRef = this.storage.ref(fileName);
    const task = this.storage.upload(fileName, file);
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }
  genList(len) {
    let list = [];
    for (let i = 0; i < len; i++) {
      list.push(i);
    }
    return list;
  }
  fileChange(event) {
    console.log(event);
    let fileList: FileList = event.target.files;
    return fileList[0];
  }
  async editProduct() {
    let dict = [];
    let prodList = [];
    let res = await this.presentContinueAlert();
    if (res == 'continue') {
      this.dataProvider.showOverlay = true;
      this.form.disable();
      this.isLoading = true;
      this.dataProvider.overlayStatus = 'Curating data fields ...';
      let val = (document.getElementById('mainProdImage') as HTMLInputElement)
        .value;
      for (let i = 0; i < +val; i++) {
        let fileEv = this.prodImagesEvents['productImage' + i];
        if (fileEv) {
          console.log('Image Exists at', fileEv);
          fileEv = this.fileChange(fileEv);
          this.dataProvider.overlayStatus =
            'Uploading file ' + fileEv.name.toString() + '...';
          const imgFile = await this.uploadFile(
            fileEv,
            `products/${this.form.get('productName')!.value}/image_${i}_${
              fileEv.name
            }`
          ).toPromise();
          this.prodImagesBackend.push({
            image: imgFile,
            imageName: this.form.get('productName')!.value.replace(' ', '_'),
          });
        }
      }
      let data = {
        productName: this.form.get('productName')!.value,
        productDescription: this.form.get('productDescription')!.value,
        shortDescription: this.form.get('shortDescription')!.value,
        seoDescription: this.form.get('seoDescription')!.value,
        productPrice: this.form.get('productPrice')!.value,
        vendorId: this.form.get('vendorId')!.value,
        totalStock: this.form.get('totalStock')!.value,
        productImages: this.prodImagesBackend,
      };
      this.dataProvider.overlayStatus = 'Uploading Data ...';
      await this.inventory.editPendingProduct(
        this.productId,
        data
      );
      this.dataProvider.overlayStatus = 'Uploaded Data Successfully';
      this.authService.presentToast('Added the data successfully');
      this.isLoading = false;
      this.form.enable();
      // this.form.reset();
      this.dataProvider.showOverlay = false;
    } else {
      this.authService.presentToast('Cancelled the operation');
    }
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async presentContinueAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure to continue.',
      message:
        'Are you sure to continue. All the data will be saved and will be live on the server.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Continue',
          role: 'continue',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private inventory: InventoryService,
    public alertController: AlertController,
    private storage: AngularFireStorage,
    public dataProvider: DataProvider,
    public afs: AngularFirestore
  ) {
    this.form = this.formbuilder.group({
      productName: this.productName,
      productDescription: this.productDescription,
      shortDescription: this.shortDescription,
      seoDescription: this.seoDescription,
      productPrice: this.productPrice,
      vendorId: this.vendorId,
      totalStock: this.totalStock,
      productImagesCount: this.productImagesCount,
    });
  }

  ngOnInit() {
    this.form.disable();
    console.log('podid',this.productId)
    this.afs
      .collection<any>('pendingProducts')
      .doc(this.productId)
      .valueChanges()
      .subscribe(async (value) => {
        console.log('value', value);
        this.form.get('productName').setValue(value.productName);
        this.form.get('productDescription').setValue(value.productDescription);
        this.form.get('shortDescription').setValue(value.shortDescription);
        this.form.get('seoDescription').setValue(value.seoDescription);
        this.form.get('productPrice').setValue(value.productPrice);
        this.form.get('vendorId').setValue(value.vendorId);
        this.form.get('totalStock').setValue(value.totalStock);
        this.form.get('productImagesCount').setValue(value.productImages.length);
        this.prodImagesBackend = value.productImages;
        await delay(500);
        for (let i = 0; i < value.productImages.length; i++) {
          let image = value.productImages[i];

          try{
            (
              document.getElementById(
                'productImage' + i.toString()
              ) as HTMLImageElement
            ).src = image.image
          } catch (e) {
            console.log("error on prodImages",e);
          }
        }
      });
    this.form.enable();
  }
}
