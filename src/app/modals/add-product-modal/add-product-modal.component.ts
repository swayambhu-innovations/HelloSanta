import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { last, switchMap } from 'rxjs/operators';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
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
  productId: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]*'),
  ]);
  productCategory: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  productSubcategory: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  vendorId: FormControl = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]*'),]);
  totalStock: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(5),
  ]);
  customisationsCount: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
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
  async addProduct() {
    let dict = [];
    let prodList = [];
    let res = await this.presentContinueAlert();
    if (res == 'continue') {
      this.dataProvider.showOverlay = true;
      this.form.disable();
      this.isLoading = true;
      let value = this.form.get('productName')!.value.replace(' ', '_');
      let x = document.getElementById('mainProdImage') as HTMLInputElement;
      for (let imgc = 0; imgc < +x.value; imgc++) {
        let fileEv = this.fileChange(
          this.prodImagesEvents['productImage' + imgc.toString()]
        );
        this.dataProvider.overlayStatus="Uploading file "+fileEv.name.toString()+"...";
        const imgFile = await this.uploadFile(
          fileEv,
          `products/${value}/image_${imgc}_${fileEv.name}`
        ).toPromise();
        console.log(imgFile)
        prodList.push({
              image: imgFile,
              imageName: this.form.get('productName')!.value.replace(' ', '_'),
        });
      }
      for (let i = 0; i < this.form.get('customisationsCount')!.value; i++) {
        let sel = (document.getElementById('radio' + i) as HTMLInputElement)
          .value;
        if (sel == 'imgSel') {
          let values = [];
          let cout = (
            document.getElementById('imgInput' + i) as HTMLInputElement
          ).value;
          for (let x = 0; x < +cout; x++) {
            let imageTitle = (
              document.getElementById(
                'imgTitle' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            let fileName = imageTitle.replace(' ', '_');
            let fileEv = this.fileChange(
              this.customSelections['image' + i.toString() + x.toString()]
            );
            let priceAddon = (
              document.getElementById(
                'priceImageAddon' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            this.dataProvider.overlayStatus="Uploading file "+fileEv.name.toString()+"...";
            const file = await this.uploadFile(
              fileEv,
              `products/${value}/optionImages/${fileName}_${x}_${fileEv.name}`
            ).toPromise();
            console.log(file)
            values.push({
              image: file,
              imageTitle: imageTitle,
              priceAddon: priceAddon,
            });
          }
          let sectionTitle = (
            document.getElementById(
              'sectionImgTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          dict.push({
            type: 'imgSel',
            length: values.length,
            title: sectionTitle,
            values: values,
          });
        } else if (sel == 'textSel') {
          let values = [];
          let cout = (
            document.getElementById('textInput' + i) as HTMLInputElement
          ).value;
          for (let x = 0; x < +cout; x++) {
            let textTitle = (
              document.getElementById(
                'textSel' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            let priceAddon = (
              document.getElementById(
                'textPriceAddon' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            values.push({
              title: textTitle,
              priceAddon: priceAddon,
            });
          }
          let sectionTitle = (
            document.getElementById(
              'sectionTextTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          dict.push({
            type: 'textSel',
            length: values.length,
            values: values,
            title: sectionTitle,
          });
        } else if (sel == 'numberSel') {
          let values = [];
          let cout = (
            document.getElementById('numInput' + i) as HTMLInputElement
          ).value;
          for (let x = 0; x < +cout; x++) {
            let numTitle = (
              document.getElementById(
                'numSel' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            let priceAddon = (
              document.getElementById(
                'numberPriceAddon' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            values.push({
              title: numTitle,
              priceAddon: priceAddon,
            });
          }
          let sectionTitle = (
            document.getElementById(
              'sectionNumTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          dict.push({
            type: 'numberSel',
            length: values.length,
            values: values,
            title: sectionTitle,
          });
        } else if (sel == 'extraInfo') {
          let values = [];
          let cout = (
            document.getElementById('extraInput' + i) as HTMLInputElement
          ).value;
          for (let x = 0; x < +cout; x++) {
            let extraTitle = (
              document.getElementById(
                'extraSel' + i.toString() + x.toString()
              ) as HTMLInputElement
            ).value;
            values.push({
              title: extraTitle,
            });
          }
          let sectionTitle = (
            document.getElementById(
              'sectionExtraTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          dict.push({
            type: 'extraInfo',
            length: values.length,
            values: values,
            title: sectionTitle,
          });
        } else if (sel == 'faceInput') {
          let inputTitle = (
            document.getElementById(
              'faceInputTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          let perPrice = (
            document.getElementById(
              'faceInputTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          let values = [{ inputTitle: inputTitle, priceAddon: perPrice }];
          dict.push({
            type: 'faceInput',
            length: values.length,
            values: values,
          });
        }
      }
      this.dataProvider.overlayStatus="Checking Data ...";
      let allConditionsFalse = true;
      while (allConditionsFalse==true) {
        let counter = 0;
        prodList.forEach((prod) => {
          if (
            prod==[] ||
            prod.image == null ||
            prod.image == '' ||
            prod.image == undefined
          ) {
            console.log('image is null');
          } else if (
            prod!=[] &&
            prod.image != null &&
            prod.image != '' &&
            prod.image != undefined
          ) {
            counter++;
          }
        });
        console.log("counter",counter);
        if (prodList.length == counter) {
          allConditionsFalse = false;
          console.log('allConditionsFalse')
        }
      }
      this.dataProvider.overlayStatus="Curating data fields ...";
      let data = {
        productName: this.form.get('productName')!.value,
        productDescription: this.form.get('productDescription')!.value,
        shortDescription: this.form.get('shortDescription')!.value,
        seoDescription: this.form.get('seoDescription')!.value,
        productPrice: this.form.get('productPrice')!.value,
        productId: this.form.get('productId')!.value,
        productCategory: this.form.get('productCategory')!.value,
        productSubcategory: this.form.get('productSubcategory')!.value,
        vendorId: this.form.get('vendorId')!.value,
        totalStock: this.form.get('totalStock')!.value,
        customisationsCount: this.form.get('customisationsCount')!.value,
        extraData:await dict,
        productImages: await prodList,
        totalCancels:0,
        totalSales:0,
      };
      await this.delay(7000);
      this.dataProvider.overlayStatus="Uploading Data ...";
      await this.inventory.addProduct(
        data.productCategory,
        data.productSubcategory,
        data.productId,
        data
      );
      this.dataProvider.overlayStatus="Uploaded Data Successfully";
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
    public dataProvider: DataProvider
  ) {
    this.form = this.formbuilder.group({
      productName: this.productName,
      productDescription: this.productDescription,
      shortDescription: this.shortDescription,
      seoDescription: this.seoDescription,
      productPrice: this.productPrice,
      productId: this.productId,
      productCategory: this.productCategory,
      productSubcategory: this.productSubcategory,
      vendorId: this.vendorId,
      totalStock: this.totalStock,
      customisationsCount: this.customisationsCount,
    });
  }

  ngOnInit() {
    this.form.enable();
  }
}
