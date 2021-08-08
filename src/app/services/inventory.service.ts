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
    addProduct(category,subCategory,productID,data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${category}/categories/${subCategory}/products/${productID}`);
      let statement = productRef.set(data,{merge:true});
      this.checkCategory(category,subCategory);
      return statement;
    }
    editProduct(category,subCategory,productID,data){
      const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${category}/categories/${subCategory}/products/${productID}`);
      let statement = productRef.update(data);
      return statement;
    }
    getAllProducts(){
      this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
        value.categories.forEach((element:any) => {
          this.afs.collection('products').doc(element.category)
          .collection('categories')
          .doc(element.subCategory)
          .collection('products').valueChanges().subscribe((value)=>{
            console.log("data=> ",value);
          })
        })
      });
    }
    addBlog(data) {
      const blogRef: AngularFirestoreDocument<any> = this.afs.doc(`blog/${data.blogId}`);
      blogRef.set(data,{merge:true});
    }
}
