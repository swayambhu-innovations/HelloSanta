import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/modals/sort-modal/sort-modal.component';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-handmadeartworks',
  templateUrl: './handmadeartworks.component.html',
  styleUrls: ['./handmadeartworks.component.scss'],
})
export class HandmadeartworksComponent implements OnInit {
screenwidth=window.innerWidth
  constructor(public modalController: ModalController,private afs: AngularFirestore,public dataProvider: DataProvider) { }
  async presentFilter() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      swipeToClose: true,
    });
    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        // this.modelData = modelData.data;
        console.log('Modal Data : ' + modelData.data);
      }
    });
    await modal.present()
    await console.log("Filter Data",this.dataProvider.filter);
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
  presentTargetFilter(){
    this.presentFilter();
    this.filter({detail:{value:this.dataProvider.filter}},'price');
  }
  presentTargetsort(){}
  resetFilter(){
    this.filters={};
    this.allHandmadeProds=this.copyArray;
    (document.getElementById('priceFilter') as HTMLIonRadioGroupElement).value='';
    (document.getElementById('categoryFilter') as HTMLIonRadioGroupElement).value='';
    (document.getElementById('subcategoryFilter') as HTMLIonRadioGroupElement).value='';
  }
  filter(event,type){
    console.log(event,"EventFromFilter");
    this.filters[type]= event.detail.value;
    this.allHandmadeProds=[];
    this.copyArray.forEach((item)=>{
      this.allHandmadeProds.push(item);
    })
    for (let i in this.filters){
      if (this.filters[i].type=='price'){
        this.allHandmadeProds=this.priceChange(i,this.allHandmadeProds);
      } else if (this.filters[i].type=='subcategory'){
        this.allHandmadeProds=this.subCategoryChange(i,this.allHandmadeProds);
      } else if (this.filters[i].type=='category'){
        this.allHandmadeProds=this.categoryChange(i,this.allHandmadeProds);
      }
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
    this.allHandmadeProds=[]
    this.copyArray.forEach((item)=>{
      this.allHandmadeProds.push(item);
    })
    for (let i in this.filters){
      if (this.filters[i].type=='subcategory'){
        this.allHandmadeProds=this.subCategoryChange(i,this.copyArray);
      } else if (this.filters[i].type=='category'){
        this.allHandmadeProds=this.categoryChange(i,this.copyArray);
      }
    }
    for (let i in this.filters){
      if (this.filters[i].type=='price'){
        this.allHandmadeProds=this.priceChange(i,this.allHandmadeProds);
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
          if (this.allHandmadeProds==undefined){
            this.allHandmadeProds=[]
          }
          this.allHandmadeProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (unknown == 0 && product.productCategory.includes('Artworks')) {
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
