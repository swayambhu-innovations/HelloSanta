import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  async calendarModal() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'Range Date',
    };

    let calendarUi =  await this.modalController.create({
      component: CalendarModal,
      componentProps: { options }
    });

    calendarUi.present();
  }
  ngOnInit() {}

}
