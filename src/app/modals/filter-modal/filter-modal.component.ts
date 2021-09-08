import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  constructor(private modalController: ModalController,public dataProvider: DataProvider) { }
  async filterEvent(event){
    console.log(event,"event")
    this.dataProvider.filter = event.detail.value;
    console.log("event two")
    await this.modalController.dismiss(event);
    console.log("event three")
  }
  ngOnInit() {}

}
