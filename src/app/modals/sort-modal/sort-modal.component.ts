import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss'],
})
export class SortModalComponent implements OnInit {
  constructor(public modalController: ModalController,public dataProvider: DataProvider,private afs: AngularFirestore) { }
  @Input() selectedSort:any=[];
  filters= {};
  addPriceOption(data){
    if (data.detail.checked){
      this.selectedSort.includes(data.detail.value) ?  console.log() : this.selectedSort.push(data.detail.value)
    } else {
      this.selectedSort.splice(this.selectedSort.indexOf(data.detail.value,1))  
    }
  }
  ngOnInit() {
  }
}
