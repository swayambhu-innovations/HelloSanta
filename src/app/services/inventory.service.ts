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
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  userData: Observable<any>;
  allProducts: Observable<any>;
  constructor(public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService) { 
      this.userData=this.afs.collection<any>('users').valueChanges();
      this.allProducts = this.afs.collection<any>('product').valueChanges();
    }
    getAllUsers(){
      return this.userData;
    }
    removeDataFromCart(){
      let cartRef = this.afs.firestore.collection(`users`).doc(this.authService.userId);
      cartRef.update({ cartItems:firebase.firestore.FieldValue.delete() });
      return true;
    }
    saveCartItems(data: any) {
      const Data={
        cartItems:data
      }
      const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(this.authService.userId);
      userRef.set(Data,{merge:true});
    }
    checkCategory(category,subCategory){
      this.afs.collection<any>('data').doc('productData').valueChanges().subscribe((value)=>{
        let found=false;
        value.categories.forEach(element => {
          if (element.subCategory == subCategory && element.category == category){
            found=true;
          }
        });
        if (!found){
          value.categories.push({subCategory:subCategory,category:category});
          this.afs.collection<any>('data').doc('productData').set(value,{merge:true});
        }
      })
    }
    addProduct(productID,data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${productID}`);
      let statement = productRef.set(data,{merge:true});
      return statement;
    }
    clearRecommendations(){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`specificSelectedProducts/products`);
      productRef.update({
        recommendedProducts:firebase.firestore.FieldValue.delete()
      });
      this.authService.presentToast("Cleared recommendation list");

    }
    clearFeatured(){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`specificSelectedProducts/products`);
      productRef.update({
        featuredProducts:firebase.firestore.FieldValue.delete()
      });
      this.authService.presentToast("Cleared featured list");
    }
    clearSantasChoice(){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`specificSelectedProducts/products`);
      productRef.update({
        santasChoice:firebase.firestore.FieldValue.delete()
      });
      this.authService.presentToast("Cleared santa's choice list");

    }
    addToWishlist(data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.authService.userId}`);
      let statement = productRef.update({
        wishlist:firebase.firestore.FieldValue.arrayUnion(data)
      });
      return statement;
    }
    addToRecommendations(data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`specificSelectedProducts/products`);
      let statement = productRef.update({
        recommendedProducts:firebase.firestore.FieldValue.arrayUnion(data)
      });
      return statement;
    }
    addToSantasChoice(data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`specificSelectedProducts/products`);
      let statement = productRef.update({
        santasChoice:firebase.firestore.FieldValue.arrayUnion(data)
      });
      return statement;
    }
    addToFeaturedProducts(data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`specificSelectedProducts/products`);
      let statement = productRef.update({
        featuredProducts:firebase.firestore.FieldValue.arrayUnion(data)
      });
      return statement;
    }
    removeFromWishlist(data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.authService.userId}`);
      let statement = productRef.update({
        wishlist:firebase.firestore.FieldValue.arrayRemove(data)
      });
      return statement;
    }
    editProduct(productID,data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${productID}`);
      let statement = productRef.update(data);
      return statement;
    }
    getAllProducts(){
      this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
        value.categories.forEach((element:any) => {
          this.afs.collection('products').valueChanges().subscribe((value)=>{
            console.log("data=> ",value);
          })
        })
      });
    }
    addBlog(data) {
      const blogRef: AngularFirestoreDocument<any> = this.afs.doc(`blog/${data.blogId}`);
      blogRef.set(data,{merge:true});
    }
    editBlog(data,blogId) {
      const blogRef: AngularFirestoreDocument<any> = this.afs.doc(`blog/${blogId}`);
      blogRef.set(data,{merge:true});
    }
    deletBlog(blogId) {
      const blogRef: AngularFirestoreDocument<any> = this.afs.doc(`blog/${blogId}`);
      blogRef.delete();
    }
    getSingleBlog(blogId){
      return this.afs.doc(`blog/${blogId}`).valueChanges();
    }
    publishBlog(blogId){
      const blogRef: AngularFirestoreDocument<any> = this.afs.doc(`blog/${blogId}`);
      blogRef.update({
        isPublished:true
      });
    }
}
