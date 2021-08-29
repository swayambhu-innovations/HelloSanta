import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
// import { ProductCatelogue } from '../home/home.component';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  userData: Observable<any>;
  allProducts: Observable<any>;
  alertData: any;
  constructor(
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.userData = this.afs.collection<any>('users').valueChanges();
    this.allProducts = this.afs.collection<any>('product').valueChanges();
  }
  async presentProdId() {
    const alert = await this.alertController.create({
      header: 'Product Id',
      inputs: [
        {
          name: 'ProductId',
          type: 'text',
          placeholder: 'Enter Product Id',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            console.log(alertData.ProductId);
            this.alertData = alertData.ProductId;
          },
        },
      ],
    });
    await alert.present();
  }
  getAllUsers() {
    return this.userData;
  }
  removeDataFromCart() {
    let cartRef = this.afs.firestore
      .collection(`users`)
      .doc(this.authService.userId);
    cartRef.update({ cartItems: firebase.firestore.FieldValue.delete() });
    return true;
  }
  saveCartItems(data: any) {
    const Data = {
      cartItems: data,
    };
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(this.authService.userId);
    userRef.set(Data, { merge: true });
  }
  checkCategory(category, subCategory) {
    this.afs
      .collection<any>('data')
      .doc('productData')
      .valueChanges()
      .subscribe((value) => {
        let found = false;
        value.categories.forEach((element) => {
          if (
            element.subCategory == subCategory &&
            element.category == category
          ) {
            found = true;
          }
        });
        if (!found) {
          value.categories.push({
            subCategory: subCategory,
            category: category,
          });
          this.afs
            .collection<any>('data')
            .doc('productData')
            .set(value, { merge: true });
        }
      });
  }
  addPendingProduct(data) {
    this.afs
      .collection('pendingProducts')
      .add(data)
      .then((docRef) => {
        const productRef = this.afs.doc(`pendingProducts/${docRef.id}`);
        productRef.update({ productId: docRef.id });
      })
      .catch((error) => {
        this.authService.presentToast('Error: ' + error.toString());
      });
  }
  addProduct(value) {
    this.afs
      .collection('products')
      .add(value)
      .then((docRef) => {
        const productRef = this.afs.doc(`products/${docRef.id}`);
        let statement = productRef.update({ productId: docRef.id });
        return statement;
      })
      .catch((error) => {
        this.authService.presentToast('Error: ' + error.toString());
      });
  }
  clearRecommendations() {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `specificSelectedProducts/products`
    );
    productRef.update({
      recommendedProducts: firebase.firestore.FieldValue.delete(),
    });
    this.authService.presentToast('Cleared recommendation list');
  }
  clearFeatured() {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `specificSelectedProducts/products`
    );
    productRef.update({
      featuredProducts: firebase.firestore.FieldValue.delete(),
    });
    this.authService.presentToast('Cleared featured list');
  }
  clearSantasChoice() {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `specificSelectedProducts/products`
    );
    productRef.update({
      santasChoice: firebase.firestore.FieldValue.delete(),
    });
    this.authService.presentToast("Cleared santa's choice list");
  }
  addToWishlist(data) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.authService.userId}`
    );
    let statement = productRef.update({
      wishlist: firebase.firestore.FieldValue.arrayUnion(data),
    });
    return statement;
  }
  addToRecommendations(data) {
    console.log(data);
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `specificSelectedProducts/products`
    );
    let statement = productRef.update({
      recommendedProducts: firebase.firestore.FieldValue.arrayUnion(data),
    });
    return statement;
  }
  addToSantasChoice(data) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `specificSelectedProducts/products`
    );
    let statement = productRef.update({
      santasChoice: firebase.firestore.FieldValue.arrayUnion(data),
    });
    return statement;
  }
  addToFeaturedProducts(data) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `specificSelectedProducts/products`
    );
    let statement = productRef.update({
      featuredProducts: firebase.firestore.FieldValue.arrayUnion(data),
    });
    return statement;
  }
  removeFromWishlist(data) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.authService.userId}`
    );
    let statement = productRef.update({
      wishlist: firebase.firestore.FieldValue.arrayRemove(data),
    });
    return statement;
  }
  editPendingProduct(productID, data) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `pendingProducts/${productID}`
    );
    let statement = productRef.update(data);
    return statement;
  }
  editProduct(productID, data) {
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(
      `products/${productID}`
    );
    let statement = productRef.update(data);
    return statement;
  }
  publishItem(id) {
    console.log('Fired pubilsh,', id);
    this.afs
      .doc(`pendingProducts/${id}`)
      .valueChanges()
      .subscribe((value: any) => {
        this.afs
          .collection(`products`)
          .add(value)
          .then((docRef) => {
            const productRef = this.afs.doc(`products/${docRef.id}`);
            let statement = productRef.update({ productId: docRef.id });
            const blogRef: AngularFirestoreDocument<any> = this.afs.doc(
              `pendingProducts/${id}`
            );
            blogRef.delete();
          })
          .catch((error) => {
            this.authService.presentToast('Error: ' + error.toString());
          });
      });
  }
  getAllProducts() {
    this.afs
      .collection('data')
      .doc('productData')
      .valueChanges()
      .subscribe((value: any) => {
        value.categories.forEach((element: any) => {
          this.afs
            .collection('products')
            .valueChanges()
            .subscribe((value) => {
              console.log('data=> ', value);
            });
        });
      });
  }
  addBlog(data) {
    this.afs
      .collection(`blog`)
      .add(data)
      .then((docRef) => {
        const productRef = this.afs.doc(`blog/${docRef.id}`);
        productRef.update({ blogId: docRef.id });
        this.authService.presentToast('Blog added');
      })
      .catch((error) => {
        this.authService.presentToast('Error: ' + error.toString());
      });
  }
  editBlog(data, blogId) {
    const blogRef: AngularFirestoreDocument<any> = this.afs.doc(
      `blog/${blogId}`
    );
    blogRef.set(data, { merge: true });
  }
  deletBlog(blogId) {
    const blogRef: AngularFirestoreDocument<any> = this.afs.doc(
      `blog/${blogId}`
    );
    blogRef.delete();
  }
  getSingleBlog(blogId) {
    return this.afs.doc(`blog/${blogId}`).valueChanges();
  }
  publishBlog(blogId) {
    const blogRef: AngularFirestoreDocument<any> = this.afs.doc(
      `blog/${blogId}`
    );
    blogRef.update({
      isPublished: true,
    });
  }
  promoteTo(access, userId) {
    if (access == 'Admin') {
      this.afs.doc(`users/${userId}`).update({
        access: { accessLevel: 'Admin' },
      });
    } else if (access == 'Vendor') {
      this.afs.doc(`users/${userId}`).update({
        access: {
          accessLevel: 'Vendor',
          levelData: {
            totalCancelled: 0,
            totalProducts: 0,
            totalReturned: 0,
            totalSold: 0,
            totalOrders: 0,
          },
        },
      });
    } else if (access == 'Customer') {
      this.afs.doc(`users/${userId}`).update({
        access: { accessLevel: 'Customer' },
      });
    }
  }
  addOffer(offer) {
    this.afs
      .collection('offers')
      .add(offer)
      .then((docRef) => {
        const productRef = this.afs.doc(`offers/${docRef.id}`);
        productRef.update({ offerId: docRef.id });
      });
    this.authService.presentToast('Offer added');
  }
  addReferral(offer, uid) {
    this.afs.collection('users').doc(uid).update({});
    this.authService.presentToast('Offer added');
  }
  addToCart(data) {
    this.afs
      .collection('users')
      .doc(this.authService.userId)
      .update({
        cartItems: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then((docRef) => {
        this.authService.presentToast('Added to cart');
      })
      .catch((error) => {
        this.authService.presentToast('Error: ' + error.toString());
      });
  }
  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  optInreferral() {
    let key = this.makeid(10);
    let userData = this.afs
      .collection('users')
      .ref.doc(this.authService.userId)
      .get()
      .then((data: any) => {
        if (data.exists) {
          if (data.data().referralCode != undefined) {
            this.authService.presentToast('You are opted in with old key');
            this.afs
              .collection(`referrals`)
              .doc(this.authService.userId).set({ userId: this.authService.userId, code: data.data().referralCode});
          } else {
            this.afs
              .collection('users')
              .doc(this.authService.userId)
              .update({ referralCode: key });
            this.afs
              .collection(`referrals`)
              .doc(this.authService.userId).set({ userId: this.authService.userId, code: key, isOptedIn: true});
            this.authService.presentToast('You are opted in with a new key.');
          }
        }
      });
    this.afs.collection('users').doc(this.authService.userId).update({
      isReferrer: true,
    });
  }
  optOutReferral(){
    this.afs.collection('users').doc(this.authService.userId).update({
      isReferrer: false,
    });
    this.afs
    .collection(`referrals`)
    .doc(this.authService.userId).set({isOptedIn: false});
    this.authService.presentToast('You have opted out');
  }
  getUserInfo(){
    return this.afs.collection('users').doc(this.authService.userId);
  }
  completeReferral(referrerUid,referredUid,code){

  }
  updateUserData(data){
    return this.afs.collection('users').doc(this.authService.userId).set(data,{merge:true});
  }
  addComment(comment,productId){
    this.afs.collection('products').doc(productId).update({
      comments:firebase.firestore.FieldValue.arrayUnion(comment),
    })
  }
  getUserOrders(){
    return this.afs.collection('users').doc(this.authService.userId).ref.get().then((user:any)=>{
      if (user.exists) {
       // return user.data();
       console.log(user.data());
      }
    });

  }
}
