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
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  customSelections = [];
  form: FormGroup;
  productName: FormControl = new FormControl('', [Validators.required,Validators.minLength(5)]);
  productDescription: FormControl = new FormControl('', [Validators.required,Validators.minLength(200),Validators.maxLength(1000)]);
  shortDescription: FormControl = new FormControl('', [Validators.required,Validators.minLength(30),Validators.maxLength(200)]);
  seoDescription: FormControl = new FormControl('', [Validators.required,Validators.minLength(50),Validators.maxLength(160)]);
  productPrice: FormControl = new FormControl('', [Validators.required]);
  productId: FormControl = new FormControl('', [Validators.required]);
  productCategory: FormControl = new FormControl('', [Validators.required]);
  productSubcategory: FormControl = new FormControl('', [Validators.required]);
  vendorId: FormControl = new FormControl('', [Validators.required]);
  totalStock: FormControl = new FormControl('', [Validators.required,Validators.min(5)]);
  customisationsCount: FormControl = new FormControl('', [Validators.required,Validators.min(1)]);
  isLoading: boolean = false;
  file:any;
  customTypeChanged(value,item) {
    console.log(value);
  }
  checkFields(){
    let dtx = "";
    let nump = 0;
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        dtx += name + ", ";
        nump++;
      }
    }
    if( nump > 0 ){
      this.authService.presentToast("There are some problems with fields "+dtx+"");
    }else{
      this.authService.presentToast("All fields are valid. Go Ahead !");
    }
  }
  loadFile(event, count) {
    var image = document.getElementById(count) as HTMLImageElement;
    image.src = URL.createObjectURL(event.target.files[0]);
    this.fileChange(event);
  }
  uploadFile(file,userName) { 
    const filePath =userName.toString()+"."+file.name.split('.').pop().toString();
    console.log("Starting file upload",filePath)
    const fileRef = this.storage.ref(filePath); 
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    )
  }
  genList(len) {
    let list = [];
    for (let i = 0; i < len; i++) {
      list.push(i);
    }
    return list;
  }
  fileChange(event) {
    let fileList: FileList = event.target.files;  
    this.file = fileList[0];
    console.log("this.file",this.file);
  }
  async addProduct() {
    let dict = [];
    this.form.disable();
    this.isLoading=true;
    for (let i = 0; i < this.form.get('customisationsCount')!.value; i++) {
      let sel = (document.getElementById("radio"+i) as HTMLInputElement).value;
      if (sel=="imgSel"){
        let values = [];
        let cout = (document.getElementById("imgInput"+i) as HTMLInputElement).value
        for (let x = 0; x < +cout; x++) {
          let image = (document.getElementById("image"+i.toString()+x.toString()) as HTMLImageElement);
          console.log("image",image);
          let imageTitle = (document.getElementById("imgTitle"+i.toString()+x.toString()) as HTMLInputElement).value;
          
          values.push({
            "image":image,
            "imageTitle":imageTitle
          })
        }
        dict.push({ "type":"imgSel","length":values.length,"values":values});
      } else if (sel=="textSel"){
        let values = [];
        let cout = (document.getElementById("textInput"+i) as HTMLInputElement).value
        for (let x = 0; x < +cout; x++) {
          let textTitle = (document.getElementById("textSel"+i.toString()+x.toString()) as HTMLInputElement).value;
          values.push({
            "title":textTitle,
          })
        }
        dict.push({ "type":"textSel","length":values.length,"values":values});
      } else if (sel=="numberSel"){
        let values = [];
        let cout = (document.getElementById("numInput"+i) as HTMLInputElement).value
        for (let x = 0; x < +cout; x++) {
          let numTitle = (document.getElementById("numSel"+i.toString()+x.toString()) as HTMLInputElement).value;
          values.push({
            "title":numTitle,
          })
        }
        dict.push({ "type":"numberSel","length":values.length,"values":values});
      }else if (sel=="extraInfo"){
        let values = [];
        let cout = (document.getElementById("extraInput"+i) as HTMLInputElement).value
        for (let x = 0; x < +cout; x++) {
          let extraTitle = (document.getElementById("extraSel"+i.toString()+x.toString()) as HTMLInputElement).value;
          values.push({
            "title":extraTitle,
          })
        }
        dict.push({ "type":"extraInfo","length":values.length,"values":values});
      }
    }
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
      extraData:dict
    }
    let res = await this.presentContinueAlert();
    if (res=='cancel'){
      this.authService.presentToast("Cancelled the operation")
    } else {
      this.inventory.addProduct(data.productCategory,data.productSubcategory,data.productId,data)
      this.authService.presentToast("Added the data successfully")
    }
    console.log(data);
    this.isLoading=false;
    this.form.enable();
  }
  async presentContinueAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure to continue.',
      message: 'Are you sure to continue. All the data will be saved and will be live on the server.',
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
        },
        {
          text:'Continue',
          role:'continue',
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role
  }
  constructor(
    private formbuilder: FormBuilder,
    private authService:AuthService,
    private inventory:InventoryService,
    public alertController: AlertController,
    private storage: AngularFireStorage,
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
