import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonDatetime,
  IonInput,
  IonSelect,
  ModalController,
  NavController,
} from '@ionic/angular';
import SwiperCore, { Swiper } from 'swiper';

import { CalendarMode, IEvent, Step } from 'ionic2-calendar/calendar';
import { InventoryService } from 'src/app/services/inventory.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent {
  // @ViewChild('eventName') eventName: IonInput;
  // @ViewChild('allDay') allDay: IonSelect;
  // @ViewChild('startDate') startDate: IonDatetime;
  // @ViewChild('endDate') endDate: any;
  screenwidth = window.innerWidth;
  events: any = [];
  calendarEvents: any = [];
  eventForm: FormGroup;
  eventTitle: FormControl = new FormControl('', [Validators.required]);
  allDay: FormControl = new FormControl(true, [Validators.required]);
  periodicType: FormControl = new FormControl('', [Validators.required]);
  startDate: FormControl = new FormControl('', [Validators.required]);
  endDate: FormControl = new FormControl('', [Validators.required]);
  eventType: FormControl = new FormControl('birthday', [Validators.required]);
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      },
    },
  };
  options = {
    mousewheel: {
      invert: true,
    },
    effect:'coverflow',
  }
  constructor(
    public modalCtrl: ModalController,
    private navController: NavController,
    private formbuilder: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.eventForm = this.formbuilder.group({
      eventTitle: this.eventTitle,
      allDay: this.allDay,
      startDate: this.startDate,
      endDate: this.endDate,
      eventType: this.eventType,
      periodicType: this.periodicType,
    });
  }
  setEventType(event){
    console.log(event);
    this.eventType.setValue(event.detail.value);
  }
  changeMode(mode) {
     this.calendar.mode = mode;
  }
  log(data){
    console.log(data);
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  onTimeSelected(ev) {
    console.log(
      'Selected time: ' +
        ev.selectedTime +
        ', hasEvents: ' +
        (ev.events !== undefined && ev.events.length !== 0) +
        ', disabled: ' +
        ev.disabled
    );
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }
  swiper = new Swiper('.swiper-wrapper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    effect:'fade',
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  
  setCheckValue(comp) {
    console.log('setCheckValue', comp);
    this.allDay.setValue(comp.detail.checked);
  }
  removeEvent(data) {
    this.inventoryService.removeCalendarEvent(data.eventId);
  }

  addEvent() {
    // console.log(this.allDay);
    let endDate = new Date(this.endDate.value);
    let startDate = new Date(this.startDate.value);
    let data = {
      title: this.eventTitle.value,
      allDay: true,
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
      type:this.eventType.value,
      mailSend: false,
      periodicType: this.periodicType.value,
    };
    this.inventoryService.addCalendarEvent(data);
    this.eventForm.reset();
  }

  ngOnInit() {
    // console.log(this.createRandomEvents());
    
    this.inventoryService
      .getUserEvents()
      .valueChanges()
      .subscribe((doc: any) => {
        this.events = [];
        this.calendarEvents = [];
        doc.forEach((event) => {
          this.events.push(event);
          let ev:IEvent={
            title: event.title,
            startTime: new Date(event.startDate),
            endTime: new Date(event.endDate),
            allDay: event.allDay,
          }
          this.calendarEvents.push(ev);
          console.log("cevents",this.calendarEvents);
        });
        console.log(this.events);
      });
  }
}
