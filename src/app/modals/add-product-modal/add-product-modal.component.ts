import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { last, switchMap } from 'rxjs/operators';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  // recommendedProducts=[]
  // featuredProducts=[]
  // santasChoice=[]
  finalData: any;
  customisations: any;
  showProgress: boolean = false;
  progressColor: string = 'warning';
  progressValue: number = 0.0;
  progressType: string = 'indeterminate';
  basicProductDetails: any;
  customSelections = {};
  prodImagesEvents = {};
  allSubCategories = [];
  allCategories = [];
  formCategories = [];
  formSubcategories = [];
  mainCategorySelected: {} = {};
  allVendors: any;
  selectedVendors = [];
  permutations: any;
  addons: any;
  basicDetail: FormGroup;
  customisationsForm: FormGroup;
  productName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  productDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(200),
    Validators.maxLength(50000)
  ]);
  shortDescription: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(30),
    Validators.maxLength(400),
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
  customisationsCount: FormControl = new FormControl(
    { value: 1, disabled: true },
    [Validators.required, Validators.min(1)]
  );
  baseWidth: FormControl = new FormControl(0, [Validators.required]);
  baseHeight: FormControl = new FormControl(0, [Validators.required]);
  baseBreadth: FormControl = new FormControl(0, [Validators.required]);
  baseWeight: FormControl = new FormControl(0, [Validators.required]);
  imageReference: FormControl = new FormControl(false);
  isLoading: boolean = false;
  changeCategoryType(value, main, type) {
    this.mainCategorySelected[main] = [];
    // console.log(this.mainCategorySelected);
  }
  addTocategory(event, index, type) {
    this.mainCategorySelected[type][index] = event.detail.value;
    // console.log(this.mainCategorySelected);
  }
  customTypeChanged(value, item) {
    // console.log(value);
  }
  toggleChange(value) {
    this.dataProvider.showOverlay = value;
  }
  checkFields() {
    let dtx = '';
    let nump = 0;
    const controls = this.basicDetail.controls;
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
    if (event.target.files[0].size > 500000) {
      this.authService.presentToast('File is greater than 500 KB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      this.customSelections[count] = this.fileChange(event);
    }
  }
  loadProdImage(event, count) {
    var image = document.getElementById(count) as HTMLImageElement;
    if (event.target.files[0].size > 500000) {
      this.authService.presentToast('File is greater than 500 KB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      this.prodImagesEvents[count] = this.fileChange(event);
    }
  }
  uploadFile(file, fileName) {
    // console.log('Starting file upload', fileName);
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
    // console.log(event);
    let fileList: FileList = event.target.files;
    return fileList[0];
  }
  async addBasicDetailProduct(stepper: MatStepper) {
    this.progressType = 'indeterminate';
    let prodList = [];
    let res = await this.presentContinueAlert();
    if (res == 'continue') {
      this.basicDetail.disable();
      this.isLoading = true;
      this.showProgress = true;
      if (
        this.formCategories.length >= 1 &&
        this.formSubcategories.length >= 1
      ) {
        let value = this.basicDetail
          .get('productName')!
          .value.replace(' ', '_');
        let x = document.getElementById('mainProdImage') as HTMLInputElement;
        // console.log('prodImagesEvents', this.prodImagesEvents);
        stepper.next();
        this.progressType = 'determinate';
        for (let imgc = 0; imgc < +x.value; imgc++) {
          this.progressValue += 1 / (+x.value * 2);
          let fileEv = this.prodImagesEvents['productImage' + imgc.toString()];
          const imgFile = await this.uploadFile(
            fileEv,
            `products/${value}/image_${imgc}_${fileEv.name}`
          ).toPromise();
          this.progressValue += 1 / (+x.value * 2);
          // console.log(imgFile);
          prodList.push({
            image: imgFile,
          });
        }
        this.authService.presentToast('Images uploaded', 4000);
        let data = {
          productName: this.basicDetail.get('productName')!.value,
          productDescription: this.basicDetail.get('productDescription')!.value,
          shortDescription: this.basicDetail.get('shortDescription')!.value,
          seoDescription: this.basicDetail.get('seoDescription')!.value,
          productPrice: this.basicDetail.get('productPrice')!.value,
          productCategory: this.formCategories,
          productSubcategory: this.formSubcategories,
          vendorId: this.selectedVendors,
          imageReference: this.imageReference.value,
          totalStock: this.basicDetail.get('totalStock')!.value,
          productImages: await prodList,
          comments: [],
          totalSales: 0,
          totalCancels: 0,
        };
        // console.log(data);
        this.basicProductDetails = data;
      } else {
        this.basicDetail.enable();
        // this.basicDetail.reset();
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
  addToVendors(event) {
    this.selectedVendors = event.detail.value;
  }
  async customisationSubmit(stepper: MatStepper) {
    // console.log('matStepper', stepper);
    let data = [];
    let relativeData = [];
    let customs = this.customisationsForm.get('customisationsCount').value;
    let error = false;
    let errorMesage = '';
    stepper.next();
    for (let i = 0; i < customs; i++) {
      try {
        let type = (
          document.getElementById('radio' + i.toString()) as HTMLInputElement
        ).value;
        this.progressValue = 0;
        if (type == 'imgSel') {
          let optionsCount = (
            document.getElementById(
              'imgInput' + i.toString()
            ) as HTMLInputElement
          ).value;
          let sectionTitle = (
            document.getElementById(
              'sectionImgTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          let isRelative = (
            document.getElementById(
              'imgCheck' + i.toString()
            ) as HTMLInputElement
          ).checked;
          if (+optionsCount > 0) {
            let options = [];
            let value = this.basicDetail
              .get('productName')!
              .value.replace(' ', '_');
            for (let imgCount = 0; imgCount < +optionsCount; imgCount++) {
              let imageTitle = (
                document.getElementById(
                  'imgTitle' + i.toString() + imgCount.toString()
                ) as HTMLInputElement
              ).value;
              let image =
                this.customSelections[
                  'image' + i.toString() + imgCount.toString()
                ];
              this.progressValue += 1 / (+optionsCount * 2);
              let imageUrl = await this.uploadFile(
                image,
                `products/${value}/ExtraOptions/${imageTitle.replace(
                  ' ',
                  '_'
                )}/image_${imgCount}_${image.name}`
              ).toPromise();
              this.progressValue += 1 / (+optionsCount * 2);
              options.push({
                type: type,
                image: imageUrl,
                title: imageTitle,
                sectionTitle: sectionTitle,
              });
              this.authService.presentToast(
                'All customisations images are uploaded successfully',
                4000
              );
            }
            if (isRelative) {
              relativeData.push({
                type: type,
                values: options,
                sectionTitle: sectionTitle,
                isRelative: isRelative,
              });
            } else {
              data.push({
                type: type,
                values: options,
                sectionTitle: sectionTitle,
                isRelative: isRelative,
              });
            }
          }
        } else if (type == 'textSel') {
          let optionsCount = (
            document.getElementById(
              'textInput' + i.toString()
            ) as HTMLInputElement
          ).value;
          let sectionTitle = (
            document.getElementById(
              'sectionTextTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          let isRelative = (
            document.getElementById(
              'textCheck' + i.toString()
            ) as HTMLInputElement
          ).checked;
          if (+optionsCount > 0) {
            let options = [];
            for (let imgCount = 0; imgCount < +optionsCount; imgCount++) {
              let textTitle = (
                document.getElementById(
                  'textSelTitle' + i.toString() + imgCount.toString()
                ) as HTMLInputElement
              ).value;
              options.push({
                type: type,
                title: textTitle,
                sectionTitle: sectionTitle,
              });
            }
            if (isRelative) {
              relativeData.push({
                type: type,
                values: options,
                sectionTitle: sectionTitle,
                isRelative: isRelative,
              });
            } else {
              data.push({
                type: type,
                values: options,
                sectionTitle: sectionTitle,
                isRelative: isRelative,
              });
            }
          }
        } else if (type == 'quantitySel') {
          let quantityMax = (
            document.getElementById(
              'quantityMax' + i.toString()
            ) as HTMLInputElement
          ).value;
          let sectionTitle = (
            document.getElementById(
              'sectionNumTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          let options=[];
          for (let faceIndex = 1; faceIndex <= +quantityMax; faceIndex++) {
            options.push({
              type: type,
              quantity: faceIndex,
              isRelative: false,
              sectionTitle: sectionTitle,
            });
          }
          data.push({
            type: type,
            quantityMax: quantityMax,
            sectionTitle: sectionTitle,
            isRelative: false,
            values: options,
          });
        } else if (type == 'extraInfo') {
          let optionsCount = (
            document.getElementById(
              'extraInput' + i.toString()
            ) as HTMLInputElement
          ).value;
          let sectionTitle = (
            document.getElementById(
              'sectionExtraTitle' + i.toString()
            ) as HTMLInputElement
          ).value;
          if (+optionsCount > 0) {
            let options = [];
            for (let imgCount = 0; imgCount < +optionsCount; imgCount++) {
              let textTitle = (
                document.getElementById(
                  'extraSel' + i.toString() + imgCount.toString()
                ) as HTMLInputElement
              ).value;
              options.push({
                type: type,
                title: textTitle,
                sectionTitle: sectionTitle,
                isRelative: false,
              });
            }
            data.push({
              type: type,
              values: options,
              sectionTitle: sectionTitle,
              isRelative: false,
            });
          }
        } else if (type == 'faceCount') {
          let maximumFaces = (
            document.getElementById(
              'faceInputMaximum' + i.toString()
            ) as HTMLInputElement
          ).value;
          let options=[];
          for (let faceIndex = 1; faceIndex <= +maximumFaces; faceIndex++) {
            options.push({
              type: type,
              faces: faceIndex,
              isRelative: false,
            });
          }
          data.push({
            type: type,
            maximumFaces: maximumFaces,
            isRelative: false,
            values: options,
          });
        }
      } catch (e) {
        error = true;
        errorMesage = e;
      }
    }
    if (!error) {
      // console.log(data, relativeData);
      let dts = [];
      for (let adp of relativeData) {
        dts.push(adp.values);
      }
      // console.log('values', dts);
      if (dts.length > 0) {
        dts = this.cartProd(dts);
      }
      // console.log('permutations', dts);
      this.permutations = dts;
      this.customisations = [];
      this.addons = JSON.parse(JSON.stringify(data));
      console.log('addons', this.addons);
      // this.customisations.push(data);
      // this.customisations.push(relativeData);
      relativeData.forEach((value) => {
        this.customisations.push(value);
      });
      data.forEach((value) => {
        this.customisations.push(value);
      });
    } else {
      this.authService.presentToast(
        'There is an error with customisation fields',
        5000
      );
      console.error(errorMesage);
    }
  }
  cartProd(paramArray) {
    function addTo(curr, args) {
      var i,
        copy,
        rest = args.slice(1),
        last = !rest.length,
        result = [];
      for (i = 0; i < args[0].length; i++) {
        copy = curr.slice();
        copy.push(args[0][i]);
        if (last) {
          result.push(copy);
        } else {
          result = result.concat(addTo(copy, rest));
        }
      }
      return result;
    }
    return addTo([], paramArray);
  }
  submitPrices(stepper: MatStepper) {
    // console.log('submitPrices triggered');
    this.progressType = 'indeterminate';
    let length = this.permutations.length;
    // console.log('copying array');
    this.finalData = JSON.parse(JSON.stringify(this.permutations));
    // console.log('array copied');
    for (let i = 0; i < length; i++) {
      let isPossible = (
        document.getElementById('isPossible' + i.toString()) as HTMLInputElement
      ).checked;
      // console.log('isPossible: ', isPossible);
      if (isPossible) {
        let data = this.permutations[i];
        this.finalData[i] = {};
        this.finalData[i]['isPossible'] = true;
        this.finalData[i]['price'] = (
          document.getElementById('price' + i.toString()) as HTMLInputElement
        ).value;
        this.finalData[i]['configLength'] = (
          document.getElementById('Length' + i.toString()) as HTMLInputElement
        ).value;
        this.finalData[i]['configWidth'] = (
          document.getElementById('Width' + i.toString()) as HTMLInputElement
        ).value;
        this.finalData[i]['configBreadth'] = (
          document.getElementById('Breadth' + i.toString()) as HTMLInputElement
        ).value;
        this.finalData[i]['configWeight'] = (
          document.getElementById('Weight' + i.toString()) as HTMLInputElement
        ).value;
        this.finalData[i]['permutations'] = data;
        // console.log('data got');
      } else {
        this.finalData[i] = {};
        this.finalData[i]['isPossible'] = false;
      }
    }
    for (let i = 0; i < this.addons.length; i++) {
      let values = [];
      if (this.addons[i].type == 'textSel' || this.addons[i].type == 'imgSel') {
        for (let j = 0; j < this.addons[i].values.length; j++) {
          let data = {
            sectionTitle: this.addons[i].values[j].sectionTitle,
            title: this.addons[i].values[j].title,
            price: (
              document.getElementById(
                'addonPrice' + i.toString() + j.toString()
              ) as HTMLInputElement
            ).value,
            length: (
              document.getElementById(
                'addonLength' + i.toString() + j.toString()
              ) as HTMLInputElement
            ).value,
            width: (
              document.getElementById(
                'addonWidth' + i.toString() + j.toString()
              ) as HTMLInputElement
            ).value,
            breadth: (
              document.getElementById(
                'addonBreadth' + i.toString() + j.toString()
              ) as HTMLInputElement
            ).value,
            weight: (
              document.getElementById(
                'addonWeight' + i.toString() + j.toString()
              ) as HTMLInputElement
            ).value,
          };
          values.push(data);
        }
      } else {
        values=this.addons[i].values || [];
      }
      for (
        let customCount = 0;
        customCount < this.customisations.length;
        customCount++
      ) {
        if (
          this.customisations[customCount].sectionTitle ==
            this.addons[i].sectionTitle &&
          this.customisations[customCount].type == this.addons[i].type
        ) {
          this.customisations[customCount] = {
            type: this.addons[i].type,
            sectionTitle: this.addons[i].sectionTitle || 'Faces',
            values: values,
            isRelative: this.addons[i].isRelative,
          };
        }
      }
    }
    // console.log('customisations', this.customisations);
    // console.log('finalData: ', this.finalData);
    // console.log('checkin validity');

    if (this.finalData != undefined) {
      if (this.basicProductDetails==undefined){this.basicProductDetails={}}
      this.basicProductDetails['permutations'] = this.finalData;
      this.basicProductDetails['extraData'] = this.customisations;
      // console.log('basicProductDetails', this.basicProductDetails);
      this.inventory.addProduct(this.basicProductDetails);
      this.modalController.dismiss();
      // console.log(this.basicProductDetails);
      this.authService.presentToast('Product added successfully', 5000);
    }
    
    this.progressType = 'determinate';
    this.showProgress = false;
  }
  increaseValue() {
    // console.log('increase value fired');
    if (
      +this.customisationsCount.value < 10 &&
      +this.customisationsCount.value >= 1
    ) {
      // console.log('increase value true');
      this.customisationsCount.setValue(+this.customisationsCount.value + 1);
    }
  }
  decreaseValue() {
    if (
      +this.customisationsCount.value <= 10 &&
      +this.customisationsCount.value > 1
    ) {
      this.customisationsCount.setValue(+this.customisationsCount.value - 1);
    }
  }
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private inventory: InventoryService,
    public alertController: AlertController,
    private storage: AngularFireStorage,
    public dataProvider: DataProvider,
    public afs: AngularFirestore,
    public modalController: ModalController
  ) {
    this.basicDetail = this.formbuilder.group({
      productName: this.productName,
      productDescription: this.productDescription,
      shortDescription: this.shortDescription,
      seoDescription: this.seoDescription,
      productPrice: this.productPrice,
      totalStock: this.totalStock,
      baseWidth: this.baseWidth,
      baseBreadth: this.baseBreadth,
      baseHeight: this.baseHeight,
      baseWeight: this.baseWeight,
      imageReference: this.imageReference,
    });
    this.customisationsForm = this.formbuilder.group({
      customisationsCount: this.customisationsCount,
    });
  }
  ngOnInit() {
    this.basicDetail.enable();
    this.afs
      .collection('data')
      .doc('category')
      .valueChanges()
      .subscribe((categories: any) => {
        this.allCategories = categories.categories;
        this.allSubCategories = categories.subCategories;
      });
    this.afs
      .collection('users')
      .ref.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          if (this.allVendors == undefined) {
            this.allVendors = [];
          }
          if (doc.data().access.accessLevel == 'Vendor') {
            this.allVendors.push({
              id: doc.id,
              name: doc.data().displayName,
            });
          }
        });
        // console.log(this.allVendors);
      });
  }
}
