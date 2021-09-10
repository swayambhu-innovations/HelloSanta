import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  async filterEvent(event){
    console.log(event,"event")
    event['filterType']='price'
    this.dataProvider.filter = event.detail.value;
    console.log("event two")
    await this.modalController.dismiss(event);
    console.log("event three")
  }
  selectedCategories=[];
  selectedSubcategories=[]
  copyArray=[];
  categories=[];
  subcategories=[];
  filters= {};
  dismiss(){
    
  }
  addCategory(data){
    if (data.detail.checked){
      this.selectedCategories.includes(4) ? console.log() : this.selectedCategories.push(data.detail.value)
    }else{
      this.selectedCategories.splice(this.selectedCategories.indexOf(data.value),1)
    }
  }
  addSubcategory(data){
    if (data.detail.checked){
      this.selectedSubcategories.includes(4) ? console.log() : this.selectedSubcategories.push(data.detail.value)
    }else{
      this.selectedSubcategories.splice(this.selectedSubcategories.indexOf(data.value),1)
    }
  }
  ngOnInit() {
    this.afs.collection('data').doc('category').ref.get().then((value:any)=>{
      if (value.exists){
        this.categories=value.data().categories;
        this.subcategories=value.data().subCategories;
      }
    })
  }

}
