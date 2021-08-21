import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  // recommendedProducts=[]
  // featuredProducts=[]
  // santasChoice=[]
  customSelections = {};
  prodImagesEvents = {};
  allSubCategories = [];
  allCategories = [];
  formCategories = [];
  formSubcategories = [];
  mainCategorySelected:{}={};
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
  formulaAvalue: FormControl = new FormControl('', [Validators.required]);
  formulaBvalue: FormControl = new FormControl('', [Validators.required]);
  formulaCvalue: FormControl = new FormControl('', [Validators.required]);
  isLoading: boolean = false;
  changeCategoryType(value,main,type){
    this.mainCategorySelected[main] = [];
    console.log(this.mainCategorySelected);
  }
  addTocategory(event,index,type){
    this.mainCategorySelected[type][index] = event.detail.value;
    console.log(this.mainCategorySelected);
  }
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
      this.dataProvider.overlayStatus = 'Curating data fields ...';
      if (
        this.formCategories.length >= 1 &&
        this.formSubcategories.length >= 1
      ) {
        let value = this.form.get('productName')!.value.replace(' ', '_');
        let x = document.getElementById('mainProdImage') as HTMLInputElement;
        for (let imgc = 0; imgc < +x.value; imgc++) {
          let fileEv = this.fileChange(
            this.prodImagesEvents['productImage' + imgc.toString()]
          );
          this.dataProvider.overlayStatus =
            'Uploading file ' + fileEv.name.toString() + '...';
          const imgFile = await this.uploadFile(
            fileEv,
            `products/${value}/image_${imgc}_${fileEv.name}`
          ).toPromise();
          console.log(imgFile);
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
              this.dataProvider.overlayStatus =
                'Uploading file ' + fileEv.name.toString() + '...';
              const file = await this.uploadFile(
                fileEv,
                `products/${value}/optionImages/${fileName}_${x}_${fileEv.name}`
              ).toPromise();
              let width = (
                document.getElementById(
                  'priceImageWidth' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let height = (
                document.getElementById(
                  'priceImageHeight' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let breadth = (
                document.getElementById(
                  'priceImageBreadth' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let weight = (
                document.getElementById(
                  'priceImageWeight' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              values.push({
                image: file,
                imageTitle: imageTitle,
                priceAddon: priceAddon,
                width: width,
                height: height,
                breadth: breadth,
                weight: weight,
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
              let width = (
                document.getElementById(
                  'textPriceWidth' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let height = (
                document.getElementById(
                  'textPriceHeight' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let breadth = (
                document.getElementById(
                  'textPriceBreadth' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let weight = (
                document.getElementById(
                  'textPriceWeight' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              values.push({
                title: textTitle,
                priceAddon: priceAddon,
                width: width,
                height: height,
                breadth: breadth,
                weight: weight,
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
              let width = (
                document.getElementById(
                  'numberPriceWidth' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let height = (
                document.getElementById(
                  'numberPriceHeight' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let breadth = (
                document.getElementById(
                  'numberPriceBreadth' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              let weight = (
                document.getElementById(
                  'numberPriceWeight' + i.toString() + x.toString()
                ) as HTMLInputElement
              ).value;
              values.push({
                title: numTitle,
                priceAddon: priceAddon,
                width: width,
                height: height,
                breadth: breadth,
                weight: weight,
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
                'faceInputPrice' + i.toString()
              ) as HTMLInputElement
            ).value;
            let values = [{ inputTitle: inputTitle, priceAddon: perPrice }];
            dict.push({
              type: 'faceInput',
              length: values.length,
              values: values,
            });
          } else if (sel == 'sizeInput') {
            let sizeTitle = (
              document.getElementById(
                'sizeInputTitle' + i.toString()
              ) as HTMLInputElement
            ).value;
            let sizesCount = (
              document.getElementById(
                'sizeInputCount' + i.toString()
              ) as HTMLInputElement
            ).value;
            let values = [];
            for (let sizesIndex of this.genList(sizesCount)) {
              let sizeInputText = (
                document.getElementById(
                  'sizeInputText' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let sizeInputAddon = (
                document.getElementById(
                  'sizeInputAddon' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let sizeInputPrice = (
                document.getElementById(
                  'sizeInputAPrice' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let sizeInputMargin = (
                document.getElementById(
                  'sizeInputMargin' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let sizeInputHours = (
                document.getElementById(
                  'sizeInputHours' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let sizeInputPPH = (
                document.getElementById(
                  'sizeInputPPH' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let sizeInputFactor = (
                document.getElementById(
                  'sizeInputSizeFactor' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let width = (
                document.getElementById(
                  'sizeInputWidth' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let height = (
                document.getElementById(
                  'sizeInputHeight' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let breadth = (
                document.getElementById(
                  'sizeInputBreadth' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              let weight = (
                document.getElementById(
                  'sizeInputWeight' + i.toString() + sizesIndex.toString()
                ) as HTMLInputElement
              ).value;
              values.push({
                sizeInputText: sizeInputText,
                sizeInputAddon: sizeInputAddon,
                sizeInputPrice: sizeInputPrice,
                sizeInputMargin: sizeInputMargin,
                sizeInputHours: sizeInputHours,
                sizeInputPPH: sizeInputPPH,
                sizeInputFactor: sizeInputFactor,
                width: width,
                height: height,
                breadth: breadth,
                weight: weight,
              });
            }
            console.log({
              title: sizeTitle,
              sizesCount: values.length,
              values: values,
            });
            dict.push({
              type:'sizeSel',
              title: sizeTitle,
              sizesCount: values.length,
              values: values,
            });
          }
        }
        this.dataProvider.overlayStatus = 'Checking Data ...';
        let allConditionsFalse = true;
        while (allConditionsFalse == true) {
          let counter = 0;
          prodList.forEach((prod) => {
            if (
              prod == [] ||
              prod.image == null ||
              prod.image == '' ||
              prod.image == undefined
            ) {
              console.log('image is null');
            } else if (
              prod != [] &&
              prod.image != null &&
              prod.image != '' &&
              prod.image != undefined
            ) {
              counter++;
            }
          });
          console.log('counter', counter);
          if (prodList.length == counter) {
            allConditionsFalse = false;
            console.log('allConditionsFalse');
          }
        }
        let data = {
          productName: this.form.get('productName')!.value,
          productDescription: this.form.get('productDescription')!.value,
          shortDescription: this.form.get('shortDescription')!.value,
          seoDescription: this.form.get('seoDescription')!.value,
          productPrice: this.form.get('productPrice')!.value,
          productCategory: this.formCategories,
          productSubcategory: this.formSubcategories,
          vendorId: this.form.get('vendorId')!.value,
          totalStock: this.form.get('totalStock')!.value,
          customisationsCount: this.form.get('customisationsCount')!.value,
          extraData: await dict,
          productImages: await prodList,
          totalCancels: 0,
          totalSales: 0,
        };
        await this.delay(1000);
        this.dataProvider.overlayStatus = 'Uploading Data ...';
        await this.inventory.addProduct(data);
        this.dataProvider.overlayStatus = 'Uploaded Data Successfully';
        this.authService.presentToast('Added the data successfully');
        this.isLoading = false;
        this.form.enable();
        // this.form.reset();
        this.dataProvider.showOverlay = false;
      } else {
        this.isLoading = false;
        this.form.enable();
        // this.form.reset();
        this.dataProvider.showOverlay = false;
        this.authService.presentToast(
          'Please select at least one category and one sub category'
        );
      }
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
  addToCatgories(data, event) {
    if (event.detail.checked) {
      if (this.formCategories.includes(data) == false) {
        this.formCategories.push(data);
      }
    } else {
      let index = this.formCategories.indexOf(data);
      this.formCategories.splice(index, 1);
    }
  }
  addToSubcatgories(data, event) {
    if (event.detail.checked) {
      if (this.formSubcategories.includes(data) == false) {
        this.formSubcategories.push(data);
      }
    } else {
      let index = this.formSubcategories.indexOf(data);
      this.formSubcategories.splice(index, 1);
    }
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
      customisationsCount: this.customisationsCount,
    });
  }

  ngOnInit() {
    this.form.enable();
    this.afs
      .collection('data')
      .doc('category')
      .valueChanges()
      .subscribe((categories: any) => {
        this.allCategories = categories.categories;
        this.allSubCategories = categories.subCategories;
      });
  }
}
