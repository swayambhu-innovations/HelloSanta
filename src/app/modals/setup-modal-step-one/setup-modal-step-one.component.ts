import { Component, OnInit } from '@angular/core';
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
  constructor(private dataProvider: DataProvider) { }
  setDOB(dob){
    this.dataProvider.data=dob;
  }
  ngOnInit() {
    this.minimumDate=(this.today.getFullYear()-120).toString();
    this.maximumDate=(this.today.getFullYear()-15).toString();
  }
}
