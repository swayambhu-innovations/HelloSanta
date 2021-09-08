import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/modals/sort-modal/sort-modal.component';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {

  screenwidth=window.innerWidth
  category: any;
  subcategory: any;
  constructor(public modalController: ModalController,private afs: AngularFirestore,private activatedRoute: ActivatedRoute,) { 
    this.activatedRoute.queryParams.subscribe((params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
    });
  }
  async presentFilter() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
    });
    return await modal.present();
  }
  async presentsort() {
    const modal = await this.modalController.create({
      component: SortModalComponent,
    });
    return await modal.present();
  }
  allDigitalProds:any;
  copyArray=[];
  categories=[];
  subcategories=[];
  filters= {};
  resetFilter(){
    this.filters={};
    this.allDigitalProds=this.copyArray;
    const el = document.getElementsByTagName('ion-checkbox');
    for (let l =0; l<el.length; l++){
      (el[l] as HTMLIonCheckboxElement).checked=false;
    }
  }
  addFilter(val,type){
    console.log(val);
    if (val.detail.checked){
      val.detail['type']=type;
      this.filters[val.detail.value] = val.detail;
    } else {
      delete this.filters[val.detail.value];
    }
    console.log(this.filters);
    this.allDigitalProds=[]
    this.copyArray.forEach((item)=>{
      this.allDigitalProds.push(item);
    })
    for (let i in this.filters){
      if (this.filters[i].type=='subcategory'){
        this.allDigitalProds=this.subCategoryChange(i,this.copyArray);
      } else if (this.filters[i].type=='category'){
        this.allDigitalProds=this.categoryChange(i,this.copyArray);
      }
    }
    for (let i in this.filters){
      if (this.filters[i].type=='price'){
        this.allDigitalProds=this.priceChange(i,this.allDigitalProds);
      }
    }

  }
  subCategoryChange(value,array){
    let tempList = [];
    array.forEach((item)=>{
      if (item.productSubcategory.includes(value)==false){
        tempList.push(item);
      }
    })
    array=tempList;
    return array;
  }
  categoryChange(value,array){
    let tempList = [];
    array.forEach((item)=>{
      if (item.productCategory.includes(value)){
        tempList.push(item);
      }
    })
    array=tempList;
    return array;
  }
  priceChange(value,array){
    if (value=='500-1000'){
      let tempList = [];
      for (let i of array) {
        if (i.productPrice>=500 && i.productPrice<=1000) {
          tempList.push(i);
        }
      }
      array=tempList;
    } else if (value=='1000-5000'){
      let tempList = [];
      for (let i of array) {
        if (i.productPrice>=1000 && i.productPrice<=5000) {
          tempList.push(i);
        }
      }
      array=tempList;
    } else if (value=='5000-10000'){
      let tempList = [];
      for (let i of array) {
        if (i.productPrice>=5000 && i.productPrice<=10000) {
          tempList.push(i);
        }
      }
      array=tempList;
    } else if (value=='Above10000'){
      let tempList = [];
      for (let i of array) {
        if (i.productPrice>10000) {
          tempList.push(i);
        }
      }
      array=tempList;
    }
    return array;
  }
  ngOnInit() {
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata) => {
        console.log('products data digital', proddata);
        proddata.forEach((product: any) => {
          let unknown = 0;
          if (this.allDigitalProds==undefined){
            this.allDigitalProds=[]
          }
          this.allDigitalProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (unknown == 0 && (product.productCategory.includes(this.category) || product.productSubcategory.includes(this.subcategory))) {
            this.allDigitalProds.push(product);
            this.copyArray.push(product);
          }
        });
      });
    this.afs.collection('data').doc('category').ref.get().then((value:any)=>{
      if (value.exists){
        this.categories=value.data().categories;
        this.subcategories=value.data().subCategories;
      }
    })
  }
}
