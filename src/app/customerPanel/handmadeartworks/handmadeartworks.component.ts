import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/modals/sort-modal/sort-modal.component';

@Component({
  selector: 'app-handmadeartworks',
  templateUrl: './handmadeartworks.component.html',
  styleUrls: ['./handmadeartworks.component.scss'],
})
export class HandmadeartworksComponent implements OnInit {
screenwidth=window.innerWidth
  constructor(public modalController: ModalController,private afs: AngularFirestore,) { }
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
  allHandmadeProds:any;
  copyArray=[];
  specifiedHandmadeProds={};
  categories=[];
  subcategories=[];
  filters= {};
  resetFilter(){
    this.filters={};
    this.allHandmadeProds=this.copyArray;
    (document.getElementById('priceFilter') as HTMLIonRadioGroupElement).value='';
    (document.getElementById('categoryFilter') as HTMLIonRadioGroupElement).value='';
    (document.getElementById('subcategoryFilter') as HTMLIonRadioGroupElement).value='';
  }
  filter(event,type){
    this.filters[type]= event.detail.value;
    this.allHandmadeProds=[];
    this.copyArray.forEach((item)=>{
      this.allHandmadeProds.push(item);
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
    this.allHandmadeProds.forEach((item)=>{
      if (item.productSubcategory.includes(value)==false){
        this.allHandmadeProds.splice(this.allHandmadeProds.indexOf(item),1);
      }
    })
  }
  categoryChange(value){
    this.allHandmadeProds.forEach((item)=>{
      if (item.productCategory.includes(value)==false){
        this.allHandmadeProds.splice(this.allHandmadeProds.indexOf(item),1);
      }
    })
  }
  priceChange(value){
    if (value=='MinToMax'){
      let tempList = [];
      for (let i; i<this.allHandmadeProds; i++) {
        let min_idx=i;
        for (let j=1; j<this.allHandmadeProds.length; j++) {
          if (this.allHandmadeProds[i].productPrice<this.allHandmadeProds[j].productPrice) {
            min_idx=j;
          }
        }
        let temp=this.allHandmadeProds[i];
        this.allHandmadeProds[i]=this.allHandmadeProds[min_idx];
        this.allHandmadeProds[min_idx]=temp;
      }
    }
    else if (value=='500-1000'){
      let tempList = [];
      for (let i of this.allHandmadeProds) {
        if (i.productPrice>=500 && i.productPrice<=1000) {
          tempList.push(i);
        }
      }
      this.allHandmadeProds=tempList;
    } else if (value=='1000-5000'){
      let tempList = [];
      for (let i of this.allHandmadeProds) {
        if (i.productPrice>=1000 && i.productPrice<=5000) {
          tempList.push(i);
        }
      }
      this.allHandmadeProds=tempList;
    } else if (value=='5000-10000'){
      let tempList = [];
      for (let i of this.allHandmadeProds) {
        if (i.productPrice>=5000 && i.productPrice<=10000) {
          tempList.push(i);
        }
      }
      this.allHandmadeProds=tempList;
    } else if (value=='Above10000'){
      let tempList = [];
      for (let i of this.allHandmadeProds) {
        if (i.productPrice>10000) {
          tempList.push(i);
        }
      }
      this.allHandmadeProds=tempList;
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
          if (this.allHandmadeProds==undefined){
            this.allHandmadeProds=[]
          }
          this.allHandmadeProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (unknown == 0 && product.productCategory.includes('Handmade Products')) {
            this.allHandmadeProds.push(product);
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
