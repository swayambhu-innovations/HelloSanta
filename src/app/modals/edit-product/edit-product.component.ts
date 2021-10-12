import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AlertController, ModalController } from '@ionic/angular';
import { last, switchMap } from 'rxjs/operators';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @Input() productId: string;
  finalData:any;
  customisations: any;
  showProgress:boolean = false;
  progressColor: string="warning";
  productData:any;
  progressValue:number=0.0;
  progressType: string = 'indeterminate';
  basicProductDetails:any;
  imagesList:any[] = [];
  customSelections = {};
  prodImagesEvents = {};
  allSubCategories = [];
  allCategories = [];
  formCategories = [];
  formSubcategories = [];
  mainCategorySelected: {} = {};
  allVendors: any;
  selectedVendors = [];
  permutations:any;
  addons:any;
  imagesNumList:number=0;
  selectedCategories:any;
  selectedSubcategories:any;
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
    Validators.maxLength(4000),
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
  customisationsCount: FormControl = new FormControl({value:1,disabled:true}, [
    Validators.required,
    Validators.min(1),
  ]);
  baseWidth: FormControl = new FormControl(0, [Validators.required]);
  baseHeight: FormControl = new FormControl(0, [Validators.required]);
  baseBreadth: FormControl = new FormControl(0, [Validators.required]);
  baseWeight: FormControl = new FormControl(0, [Validators.required]);
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
  loadProdImage(event, count,index) {
    var image = document.getElementById(count) as HTMLImageElement;
    if (event.target.files[0].size > 500000) {
      this.authService.presentToast('File is greater than 500 KB');
      event.target.value = '';
    } else {
      image.src = URL.createObjectURL(event.target.files[0]);
      // this.prodImagesEvents[count] = this.fileChange(event);
      let data = {
        image:this.fileChange(event),
        index:index,
        type:'event',
      }
      this.imagesList[index] =data
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
    // console.log(event);
    let fileList: FileList = event.target.files;
    return fileList[0];
  }
  async addBasicDetailProduct() {
    this.progressType="indeterminate"
    let res = await this.presentContinueAlert();
    if (res == 'continue') {
      this.basicDetail.disable();
      this.isLoading = true;
      this.showProgress=true;
      if (
        this.formCategories.length >= 1 &&
        this.formSubcategories.length >= 1
      ) {
        console.log('imagesList',this.imagesList);
        this.progressType="determinate"
        // await this.imagesList.forEach(async (element,index) => {
        //   if(element.type=='event'){
        //     let url = await this.uploadFile(element.image,`products/${this.productName.value}/image_${index}_${element.image.name}`).toPromise();
        //     console.log(url);
        //     this.imagesList[index]={
        //       image:await url,
        //       index:index,
        //       type:'url',
        //     }
        //   }
        // })
        let imagesData = []
        await Promise.all(this.imagesList.map(async (element,index) => {
          if(element.type=='event'){
            let url = await this.uploadFile(element.image,`products/${this.productName.value}/image_${index}_${element.image.name}`).toPromise();
            // this.imagesList[index]={
            //   image:url,
            //   index:index,
            //   type:'url',
            // }
            imagesData.push({image:url})
            console.log("PostUrl",url);
          } else {
            imagesData.push({image:element.image})
            console.log("PreUrl",element.image);
          }
        }))
        this.authService.presentToast('Images uploaded',4000);
        // this.imagesList.forEach(element => {
        //   console.log(element);
        //   imagesData.push({image:element.image})
        // })
        console.log(imagesData);
        let data = {
          productName:this.productName.value,
          productPrice:this.productPrice.value,
          productDescription:this.productDescription.value,
          shortDescription:this.shortDescription.value,
          seoDescription:this.seoDescription.value,
          productCategory:this.formCategories,
          productSubcategory:this.formSubcategories,
          vendorId:this.selectedVendors,
          totalStock:this.totalStock.value,
          productImages:await imagesData,
        };
        console.log(data);
        this.inventory.editProduct(this.productId,data)
        this.basicProductDetails=data;
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
  cartProd(paramArray) {
    function addTo(curr, args) {
      var i, copy, 
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
  increaseValue(){
    // console.log("increase value fired")
    if (+this.customisationsCount.value < 10 && +this.customisationsCount.value >= 1){
      // console.log("increase value true")
      this.customisationsCount.setValue(+this.customisationsCount.value + 1);
    }
  }
  decreaseValue(){
    if (+this.customisationsCount.value <= 10 && +this.customisationsCount.value > 1){
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
    public modalController: ModalController,
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
    });
    this.customisationsForm = this.formbuilder.group({
      customisationsCount: this.customisationsCount,
    });
  }
  ngOnInit() {
    this.afs.collection('products').doc(this.productId).get().subscribe(async (data:any)=>{
      this.productName.setValue(data.data().productName);
      this.productDescription.setValue(data.data().productDescription);
      this.shortDescription.setValue(data.data().shortDescription);
      this.seoDescription.setValue(data.data().seoDescription);
      this.productPrice.setValue(data.data().productPrice);
      this.totalStock.setValue(data.data().totalStock);
      this.selectedCategories=data.data().productCategory;
      this.selectedSubcategories=data.data().productSubcategory;
      this.formCategories=data.data().productCategory;
      this.formSubcategories=data.data().productSubcategory;
      this.selectedVendors=data.data().vendorId;
      this.productData = data.data();
      data.data().productImages.forEach((element,index) => {
        element['type']="url";
        element['index']=index;
        this.imagesList.push(element);
      })
      // console.log("product data",this.productData,this.selectedVendors);
      let imgCount = 0;
      this.imagesNumList = data.data().productImages.length;
      // console.log("images num list",this.imagesNumList);
      // (document.getElementById('mainProdImage') as HTMLInputElement).value = data.data().productImages.length;
      await this.delay(1000);
      for (let i of data.data().productImages){

        (document.getElementById('productImage'+imgCount) as HTMLImageElement).src = i.image
        imgCount++;
      }
    })
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
