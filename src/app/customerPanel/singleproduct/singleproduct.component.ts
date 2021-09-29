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
  quantity: number = 1;
  productId: string;
  selectedImage: string;
  productData: any;
  purchasedProduct: boolean = false;
  productPrice: number = 0;
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
    public authService: AuthService,
    public dataProvider: DataProvider,
    private inventoryService: InventoryService,
    private router: Router,
    private analytics: AngularFireAnalytics,
    private formbuilder: FormBuilder,
    public popoverController: PopoverController
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      dataProvider.showOverlay= true
      this.productId = params['productId'];
      this.ngOnInit();
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      try { document.getElementById('product-details').scrollIntoView()} catch(e) {}
    });
  }

  setImage(item) {
    this.selectedImage = item;
    (
      document.getElementsByClassName('ngxImageZoomFull')[0] as HTMLImageElement
    ).src = item;
  }
  genList(value) {
    let randomList = [];
    for (let i = 1; i < value + 1; i++) {
      randomList.push(i);
    }
    return randomList;
  }
  buyNow() {
    if (this.authService.isJustLoggedIn){
      this.analytics.logEvent('buyNow', {
        productId: this.productId,
        productName: this.productData.productName,
      });
      if (
        Object.keys(this.extrasData).length == this.productData.extraData.length
      ) {
        this.dataProvider.showOverlay = true;
        // alert('Add to cart product price' + this.productPrice.toString());
        this.dataProvider.data = {"type":"buynow"}
        this.dataProvider.checkOutdata = [
          {
            productData: this.productData.productId,
            extrasData: this.extrasData,
            price: this.productPrice,
            quantity: this.quantity,
          },
        ];
        this.router.navigate(['checkout']);
      } else {
        this.authService.presentToast('Please select all the extras options.');
      }
    } else {
      this.authService.presentToast('Please login to continue.');
      this.router.navigate(['login']);
    }
  }
  addToCart() {
    if (this.authService.isJustLoggedIn){
      this.analytics.logEvent('addToCart');
      if (
        Object.keys(this.extrasData).length == this.productData.extraData.length
      ) {
        let cartItem = {
          productData: this.productData.productId,
          extrasData: this.extrasData,
          price: this.productPrice,
          quantity: this.quantity,
        };
        this.inventoryService.addToCart(cartItem);
        // console.log('addToCart');
      } else {
        this.authService.presentToast('Please select all the extras options.');
      }
    } else {
      this.authService.presentToast('Please login to continue.');
      this.router.navigate(['login']);
    }
  }
  round5(x) {
    return Math.ceil(x / 5) * 5;
  }
  comparePriceListing(object1, Object2) {
    // // console.log('compare price',object1, Object2);
    let isTrue = true;
    for (let i of Object.keys(object1)) {
      if (i == 'isRelative') {
        continue;
      }
      if (object1[i] != Object2[i]) {
        isTrue = false;
      }
    }
    // // console.log('isTrue',isTrue);
    return isTrue;
  }
  calculatePrice() {
    // // console.log("calculatePrice",this.extrasData);
    // let addonPrice:number = 0;
    this.productPrice = 0;
    for (
      let valIndex = 0;
      valIndex < this.productData.permutations.length;
      valIndex++
    ) {
      let val: any = this.productData.permutations[valIndex];
      let vldCounter = 0;
      let relativeCounter = 0;
      for (let i of Object.keys(this.extrasData)) {
        if (this.extrasData[i].isRelative) {
          relativeCounter++;
          // // console.log(val,"isPossible")
          if (val.isPossible == true) {
            val.permutations.forEach((perm) => {
              if (this.comparePriceListing(perm, this.extrasData[i])) {
                vldCounter++;
              }
            });
          } else {
            // // console.log("not possible", this.productPrice);
            this.productPrice = undefined;
          }
        }
      }
      if (
        vldCounter == relativeCounter &&
        vldCounter != 0 &&
        relativeCounter != 0
      ) {
        this.productPrice = +val.price;
        vldCounter = 0;
        break;
      }
      // // console.log("calculatePrice", this.productPrice);
    }
    let quantity = 1;
    let faceCounts = 0;
    if (this.productPrice != undefined && this.productPrice != 0) {
      for (let i of Object.keys(this.extrasData)) {
        if (this.extrasData[i].isRelative == false) {
          if (
            this.extrasData[i].type == 'textSel' ||
            this.extrasData[i].type == 'imgSel'
          ) {
            this.productPrice += +this.extrasData[i].price;
          } else if (this.extrasData[i].type == 'quantitySel') {
            quantity = +this.extrasData[i].quantity;
          } else if (this.extrasData[i].type == 'faceCount') {
            faceCounts = +this.extrasData[i].faces;
          }
        }
      }
      let facesExtraPrices = 0;
      if (faceCounts > 1) {
        facesExtraPrices = (+this.productPrice / 100) * (75 * faceCounts);
      }
      this.quantity = quantity;
      this.productPrice = (+this.productPrice + facesExtraPrices);
      // let gstPrice = ((quantifiedPrice/100)*18);
      // let platformPrice = ((quantifiedPrice+gstPrice)/100)*3;
    } else {
      this.productPrice = undefined;
      this.authService.presentToast(
        'Please select all options then you can select addons'
      );
    }
  }
  updateData(event, relative, sectionTitle) {
    // // console.log(event);
    if (typeof event.detail.value == 'object') {
      // console.log('updater ', event, relative, sectionTitle);
      event.detail.value['isRelative'] = relative || false;
      this.extrasData[sectionTitle] = event.detail.value;
      // console.log(this.extrasData);
      // console.log(this.extrasData);
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
          // // console.log("rela",val,sectionTitle)
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
            'You need to select' +
              msgString +
              ' faces and addons to get final price'
          );
        } else {
          this.calculatePrice();
        }
      } else {
        this.calculatePrice();
      }
    }
  }
  async addComment(ev) {
    const popover = await this.popoverController.create({
      component: AddCommentComponent,
      componentProps: {
        productId: this.productId,
      },
      event: ev,
      cssClass: 'commentBox',
      translucent: true,
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  ngOnInit() {
    if (this.authService.isJustLoggedIn){
      this.inventoryService
      .getUserOrders()
      .ref.get()
      .then((doc: any) => {
        doc.forEach((ord: any) => {
          ord = ord.data();
          ord.products.forEach((prod: any) => {
            if (prod.productId == this.productId) {
              this.purchasedProduct = true;
            }
          });
        });
      });
    }
    this.afs
      .collection('products')
      .doc(this.productId)
      .ref.get()
      .then((value: any) => {
        value = value.data();
        this.productData = value;
        this.productPrice = 0;
        this.displayPrice = value.productPrice;
        this.selectedImage = this.productData.productImages[0].image;
        this.selectedExtraType = this.productData.extraData[0].type;
        this.selectedExtraTitle = this.productData.extraData[0].sectionTitle;
        this.category = this.productData.productCategory;
        this.subcategory = this.productData.productSubcategory;
        for (let d of this.productData.extraData) {
          if (d.type == 'faceCount') {
            this.extrasData[d.sectionTitle] = d.values[0];
          }
        }
        this.dataProvider.showOverlay= false;
      });
    this.afs
      .collection('products')
      .doc(this.productId)
      .collection('comments')
      .ref.get()
      .then((value: any) => {
        this.comments = [];
        value.forEach((doc: any) => {
          this.comments.push(doc.data());
        });
      });
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata: any) => {
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.recommendationProducts.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
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
