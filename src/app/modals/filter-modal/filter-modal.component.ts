import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  constructor(public modalController: ModalController,public dataProvider: DataProvider,private afs: AngularFirestore) { }
  @Input() selectedCategories:any[]=[];
  @Input() selectedSubcategories:any[]=[];
  @Input() modalFilterPrice:any[]=[];
  copyArray=[];
  categories=[];
  subcategories=[];
  dismiss(){
    let data = {
      'category':{
        'category':[
          ...this.selectedCategories
        ],
        'subcategory':[
          ...this.selectedSubcategories
        ],
      },
      'prices':this.modalFilterPrice || [],
    };
    this.modalController.dismiss(data);
  }
  addCategory(data){
    if (data.detail.checked){
      this.selectedCategories.includes(data) ? console.log() : this.selectedCategories.push(data)
    }else{
      this.selectedCategories.splice(this.selectedCategories.indexOf(data),1)
    }
  }
  addSubcategory(data){
    if (data.detail.checked){
      this.selectedSubcategories.includes(data) ? console.log() : this.selectedSubcategories.push(data)
    } else {
      this.selectedSubcategories.splice(this.selectedSubcategories.indexOf(data),1)  
    }
  }
  addPriceOption(data){
    if (data.detail.checked){
      // console.log(this.modalFilterPrice.includes(data));
      console.log('Adding Price');
      this.modalFilterPrice.includes(data) ?  console.log('Already Selected') : this.modalFilterPrice.push(data)
    } else {
      console.log('Removing Price');
      let index = 0
      for (index = 0; index < this.modalFilterPrice.length; index++) {
        const value = this.modalFilterPrice[index].detail.value;
        if (value==data.detail.value){
          delete this.modalFilterPrice[index];
        }
      }
      // this.modalFilterPrice.splice(index,this.modalFilterPrice.length)
      this.modalFilterPrice = this.modalFilterPrice.filter((el)=>{ return el != undefined; });
      console.log('Removed Price',this.modalFilterPrice);
    }
  }
  ngOnInit() {
    // console.log('Selected Prices',this.modalFilterPrice);
    // console.log('Selected Categories',this.selectedCategories);
    // console.log('Selected Subcategories',this.selectedSubcategories);
    this.afs.collection('data').doc('category').ref.get().then((value:any)=>{
      if (value.exists){
        this.categories=value.data().categories;
        this.subcategories=value.data().subCategories;
      }
    });
  }
  includesPrice(price){
    var result = false;
    this.modalFilterPrice.forEach(element => {
      if (element.detail.value==price){
        result=true;
      }
    })
    return result;
  }
  includesCategory(category){
    var result = false;
    this.selectedCategories.forEach(element => {
      if (element.detail.value==category){
        result=true;
      }
    })
    return result;
  }
  includesSubcategory(subcategory){
    var result = false;
    this.selectedSubcategories.forEach(element => {
      if (element.detail.value==subcategory){
        result=true;
      }
    })
    return result;
  }

}
