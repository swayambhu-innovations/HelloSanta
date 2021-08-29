import { Component, ViewChild } from '@angular/core';
import { IonDatetime, IonInput, IonSelect, ModalController } from '@ionic/angular';
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
  @ViewChild('eventName') eventName: IonInput;
  @ViewChild('eventType') eventType: IonSelect;
  @ViewChild('eventDate') eventDate: IonDatetime;
  events:any=[
    {
      "name":"hallo",
      "date":"21-03-21",
      "type":"Birthday",
    }
  ];
  constructor(public modalCtrl: ModalController) { }
  addEvent(){
    console.log("date",this.eventDate)
    console.log("type",this.eventType)
    console.log("eventName",this.eventName)
  }
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
