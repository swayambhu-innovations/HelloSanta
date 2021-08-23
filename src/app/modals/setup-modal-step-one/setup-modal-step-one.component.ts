import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-setup-modal-step-one',
  templateUrl: './setup-modal-step-one.component.html',
  styleUrls: ['./setup-modal-step-one.component.scss'],
})
export class SetupModalStepOneComponent implements OnInit {
  minimumDate=""
  maximumDate=""
  today = new Date();
  constructor(private dataProvider: DataProvider,private modalController:ModalController) { }
  setDOB(dob){
    if (dob!=undefined){
      this.dataProvider.data=dob;
      this.modalController.dismiss({
        'dismissed': true
      });
    } else {
      alert("Please enter a valid date of birth");
    }
  }
  ngOnInit() {
    this.minimumDate=(this.today.getFullYear()-120).toString();
    this.maximumDate=(this.today.getFullYear()-15).toString();
  }
}
