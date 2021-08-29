import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion2-calendar';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent{

  constructor(public modalCtrl: ModalController) { }

  async  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'BASIC'
    };
 
    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });
 
    myCalendar.present();
 
    const event: any = await myCalendar.onDidDismiss();
    const title: any = "helloboy";
    const date: CalendarResult = event.data;
    const datetitle: DayConfig = event.title;
    console.log(date);
    console.log(title);
  }
  ngOnInit() {}

}
