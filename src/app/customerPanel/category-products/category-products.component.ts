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
    (document.getElementById('priceFilter') as HTMLIonRadioGroupElement).value='';
    (document.getElementById('categoryFilter') as HTMLIonRadioGroupElement).value='';
    (document.getElementById('subcategoryFilter') as HTMLIonRadioGroupElement).value='';
  }
  filter(event,type){
    this.filters[type]= event.detail.value;
    this.allDigitalProds=[];
    this.copyArray.forEach((item)=>{
      this.allDigitalProds.push(item);
    })
    for (let i in this.filters){
      if (i=='price'){
        this.priceChange(this.filters[i]);
      } else if (i=='subcategory'){
        this.subCategoryChange(this.filters[i]);
      } else if (i=='category'){
        this.categoryChange(this.filters[i]);
      }
    }
  }
  subCategoryChange(value){
    this.allDigitalProds.forEach((item)=>{
      if (item.productSubcategory.includes(value)==false){
        this.allDigitalProds.splice(this.allDigitalProds.indexOf(item),1);
      }
    })
  }
  categoryChange(value){
    this.allDigitalProds.forEach((item)=>{
      if (item.productCategory.includes(value)==false){
        this.allDigitalProds.splice(this.allDigitalProds.indexOf(item),1);
      }
    })
  }
  priceChange(value){
    if (value=='MinToMax'){
      let tempList = [];
      for (let i; i<this.allDigitalProds; i++) {
        let min_idx=i;
        for (let j=1; j<this.allDigitalProds.length; j++) {
          if (this.allDigitalProds[i].productPrice<this.allDigitalProds[j].productPrice) {
            min_idx=j;
          }
        }
        let temp=this.allDigitalProds[i];
        this.allDigitalProds[i]=this.allDigitalProds[min_idx];
        this.allDigitalProds[min_idx]=temp;
      }
    }
    else if (value=='500-1000'){
      let tempList = [];
      for (let i of this.allDigitalProds) {
        if (i.productPrice>=500 && i.productPrice<=1000) {
          tempList.push(i);
        }
      }
      this.allDigitalProds=tempList;
    } else if (value=='1000-5000'){
      let tempList = [];
      for (let i of this.allDigitalProds) {
        if (i.productPrice>=1000 && i.productPrice<=5000) {
          tempList.push(i);
        }
      }
      this.allDigitalProds=tempList;
    } else if (value=='5000-10000'){
      let tempList = [];
      for (let i of this.allDigitalProds) {
        if (i.productPrice>=5000 && i.productPrice<=10000) {
          tempList.push(i);
        }
      }
      this.allDigitalProds=tempList;
    } else if (value=='Above10000'){
      let tempList = [];
      for (let i of this.allDigitalProds) {
        if (i.productPrice>10000) {
          tempList.push(i);
        }
      }
      this.allDigitalProds=tempList;
    }
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
