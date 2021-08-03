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
  constructor(public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService) { 
      this.userData=this.afs.collection<any>('users').valueChanges();
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
}
