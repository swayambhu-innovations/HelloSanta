import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { PopoverController } from '@ionic/angular';
import { AddCommentComponent } from 'src/app/popovers/add-comment/add-comment.component';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss'],
})
export class SingleproductComponent implements OnInit {
  screenwidth = window.innerWidth;
  category = [];
  subcategory = [];
  productId: string;
  selectedImage: string;
  productData: any;
  productPrice: number=0;
  selectedExtraType: string;
  selectedExtraTitle: string;
  recommendationProducts = [];
  extrasData: any = {};
  comments: any;
  priceList = {};
  displayPrice = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    public afs: AngularFirestore,
    private authService: AuthService,
    private dataProvider: DataProvider,
    private inventoryService: InventoryService,
    private router: Router,
    private analytics: AngularFireAnalytics,
    private formbuilder: FormBuilder,
    public popoverController: PopoverController,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });
  }
  
  
  genList(value) {
    let randomList = [];
    for (let i = 1; i < value + 1; i++) {
      randomList.push(i);
    }
    return randomList;
  }
  buyNow() {
    this.analytics.logEvent('buyNow', {
      productId: this.productId,
      productName: this.productData.productName,
    });
    if (
      Object.keys(this.extrasData).length ==
      this.productData.extraData.length - 2
    ) {
      alert('Add to cart product price' + this.productPrice.toString());
      this.dataProvider.checkOutdata = [
        {
          productData: this.productData.productId,
          extrasData: this.extrasData,
          price: this.productPrice,
        },
      ];
      this.router.navigate(['checkout']);
    } else {
      this.authService.presentToast('Please select all the extras options.');
    }
  }
  addToCart() {
    this.analytics.logEvent('addToCart');
    if (
      Object.keys(this.extrasData).length ==
      this.productData.extraData.length - 1
    ) {
      let cartItem = {
        productData: this.productData.productId,
        extrasData: this.extrasData,
        price: this.productPrice,
      };
      this.inventoryService.addToCart(cartItem);
      console.log('addToCart');
    } else {
      this.authService.presentToast('Please select all the extras options.');
    }
  }
  round5(x) {
    return Math.ceil(x / 5) * 5;
  }
  comparePriceListing(object1, Object2) {
    let isTrue = true;
    for (let i of Object.keys(object1)) {
      if (object1[i] != Object2[i]) {
        // console.log(object1[i], Object2[i],i);
        if (i!="isRelative"){
          isTrue = false;
        }// console.log("i",i,object1[i],Object2[i])
      }
    }
    return isTrue;
  }
  calculatePrice() {
    // console.log("calculatePrice",this.extrasData);
    // let addonPrice:number = 0;
    this.productPrice = 0;
    this.productData.permutations.forEach((val) => {
      let vldCounter = 0;
      let relativeCounter= 0;
      for (let i of Object.keys(this.extrasData)){
        if (this.extrasData[i].isRelative){
          relativeCounter++;
          console.log(val.isPossible,"isPossible")
          if (val.isPossible==true){
            val.permutations.forEach((perm) => {
              if (this.comparePriceListing(perm, this.extrasData[i])) {
                vldCounter++;
              }
            });
          } else {
            this.productPrice = undefined;
          }
        }
      }
      if (vldCounter == relativeCounter && vldCounter!=0 && relativeCounter!=0) {
        this.productPrice = +val.price;
        vldCounter = 0;
      }
      console.log("calculatePrice", this.productPrice);
    });
    if (this.productPrice != undefined && this.productPrice != 0) {
      for (let i of Object.keys(this.extrasData)){
        if (this.extrasData[i].isRelative==false){
          this.productPrice += +this.extrasData[i].price;
        }
      }
    } else {
      this.productPrice = undefined;
      this.authService.presentToast("Please select all options then you can select addons")
    }
  }
  updateData(event, relative, sectionTitle) {
    // console.log(event);
    event.detail.value['isRelative']=relative;
    this.extrasData[sectionTitle] = event.detail.value;
    let relatives = [];
    if (relative) {
      let msgString = '';
      this.productData.extraData.forEach((val: any) => {
        if (val.isRelative == relative) {
          val.values.forEach((options) => {
            relatives.push(options);
          });
        }
      });
      let checked = [];
      relatives.forEach((val) => {
        // console.log("rela",val,sectionTitle)
        if (
          !relatives.includes(this.extrasData[val.sectionTitle]) &&
          !checked.includes(val.sectionTitle)
        ) {
          msgString += ' ' + val.sectionTitle + ',';
          checked.push(val.sectionTitle);
        }
      });
      if (msgString.length > 0) {
        this.authService.presentToast(
          'You need to select' + msgString + ' to get final price'
        );
      } else {
        this.calculatePrice();
      }
    } else {
      this.calculatePrice();
    }
  }
  async addComment(ev) {
    const popover = await this.popoverController.create({
      component: AddCommentComponent,
      componentProps: {
        productId: this.productId,
      },
      event: ev,
      cssClass:"commentBox",
      translucent: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  ngOnInit() {
    this.afs
      .collection('products')
      .doc(this.productId)
      .ref
      .get()
      .then((value: any) => {
        value=value.data();
        console.log(value);
        this.productData = value;
        this.productPrice = 0;
        this.displayPrice = value.productPrice;
        this.selectedImage = this.productData.productImages[0].image;
        this.selectedExtraType = this.productData.extraData[0].type;
        this.selectedExtraTitle = this.productData.extraData[0].sectionTitle;
        this.category = this.productData.productCategory;
        this.subcategory = this.productData.productSubcategory;
        this.comments = value.comments;
      });
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata: any) => {
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.recommendationProducts.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (
            unknown == 0 &&
            (this.category.some((ct) => product.productCategory.includes(ct)) ||
              this.subcategory.some((ct) =>
                product.productSubcategory.includes(ct)
              ))
          ) {
            this.recommendationProducts.push(product);
          }
        });
      });
  }
}
