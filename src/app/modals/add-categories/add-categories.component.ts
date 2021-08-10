import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
})
export class AddCategoriesComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }
  allCategories=[];
  allSubCategories=[];
  ngOnInit() {
    this.afs.collection('data').doc('category').valueChanges().subscribe((categories:any) => {
      this.allCategories = categories.categories;
      this.allSubCategories = categories.subCategories;
    })
    
  }
  addCategory(category){
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`data/category`);
    productRef.set({
      categories:firebase.firestore.FieldValue.arrayUnion(category)
    },{merge:true});
  }
  addSubCategory(subcategory){
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`data/category`);
    productRef.set({
      subCategories:firebase.firestore.FieldValue.arrayUnion(subcategory)
    },{merge:true});
  }
}
