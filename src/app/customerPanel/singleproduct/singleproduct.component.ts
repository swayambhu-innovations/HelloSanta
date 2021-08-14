import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss'],
})
export class SingleproductComponent implements OnInit {
  screenwidth = window.innerWidth;
    category=[];
    subcategory=[];
    productId:string;
    selectedImage:string;
    productData:any;
    productPrice:number;
    selectedExtraType:string;
    selectedExtraTitle:string;
    recommendationProducts=[];
    extrasData:any={};
    priceList={};
  constructor(
    private activatedRoute: ActivatedRoute,
    public afs: AngularFirestore,
    private authService: AuthService,
    private dataProvider: DataProvider,
    private inventoryService: InventoryService) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.productId = params['productId'];
    });
  }
  genList(value) {
    let randomList = [];
    for (let i = 1; i < value+1; i++) {
        randomList.push(i);
    }
    return randomList;
  }
  buyNow() {
    this.dataProvider.checkOutdata={
      productData:this.productData.productId,
      extrasData:this.extrasData,
      price:this.productPrice,
    }
    
  }
  addToCart() {
    if (Object.keys(this.extrasData).length==this.productData.extraData.length-1){
      let cartItem = {
        productData:this.productData.productId,
        extrasData:this.extrasData,
        price:this.productPrice,
      }
      this.inventoryService.addToCart(cartItem)
      console.log("addToCart");
    } else {
      this.authService.presentToast('Please select all the extras options.')
    }
  }
  round5(x){
    return Math.ceil(x/5)*5;
  }
  calculatePrice(){
    this.productPrice=this.productData.productPrice;
    for (let key in this.extrasData) {
      let currentValue=0;
      console.log("key",key);
      if (key.startsWith('sizeSel') || key.startsWith('faceInput')){
        if (this.extrasData['sizeSel']!=undefined && this.extrasData['faceInput']!=undefined){
          console.log("Calculate formula")
          let sizeSel = this.extrasData['sizeSel'];
          let faceCount = this.extrasData['faceInput']
          let yDash = (100+(faceCount-1)*70)/100;
          let value = ((((((+sizeSel.sizeInputFactor)*yDash*(+sizeSel.sizeInputHours)*(+sizeSel.sizeInputPPH))+(+sizeSel.sizeInputPrice)+(+sizeSel.sizeInputAddon))*(100+(+sizeSel.sizeInputMargin))*0.01))*1.12)*1.03;
          console.log("value",value);
          currentValue=value;
        }else{
          this.authService.presentToast('Please select faces in the image and also select size of the picture.')
        }
      } else {
        // console.log(key,this.extrasData[key].priceAddon);
        currentValue=+this.extrasData[key].priceAddon;
      }
      this.productPrice+=currentValue;
    }
    console.log(this.productPrice);
    let gstplatformValue = this.productPrice+((this.productPrice+(this.productPrice/100)*12)/100)*3;
    console.log(gstplatformValue);
    this.productPrice=this.round5(gstplatformValue)
  }
  updateData(event,data){
    let dat = event.detail.value;
    if (data=='sizeSel'){
      this.extrasData[data]=dat;
    } else{
      // this.productPrice+=+event.detail.value.priceAddon;
      this.extrasData[data]=event.detail.value;
    }
    this.calculatePrice()
    // this.extrasData[data]=event.detail.value;
    console.log(this.extrasData);
    
  }
  ngOnInit() {
    this.afs.collection('products').doc(this.productId).valueChanges().subscribe((value:any)=>{
        console.log(value);
        this.productData=value;
        this.productPrice=value.productPrice;
        this.selectedImage=this.productData.productImages[0].image;
        this.selectedExtraType=this.productData.extraData[0].type;
        this.selectedExtraTitle=this.productData.extraData[0].title;
        this.category=this.productData.productCategory;
        this.subcategory=this.productData.productSubcategory;
    })
    this.afs
        .collection('products').valueChanges().subscribe((proddata:any)=>{
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.recommendationProducts.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0 && (this.category.some(ct => product.productCategory.includes(ct)) || this.subcategory.some(ct => product.productSubcategory.includes(ct)))) {
              this.recommendationProducts.push(product);
            }
          })
        })
  }
  products = [
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
  ];
}
