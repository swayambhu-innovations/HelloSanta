import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { MailServiceService } from './mail-service.service';

@Injectable({
  providedIn: 'root',
})
export class EventSchedulerService {
  eventLoop: boolean = false;
  constructor(
    private afs: AngularFirestore,
    private mailService: MailServiceService,
    private authService: AuthService,
  ) {}
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async event() {
    while (true) {
      if (this.eventLoop) {
        console.log('userEvents top');
        this.afs.firestore.collection('users').get().then((data:any) => {
          data.forEach((element: any) => {
            element = element.data();
            this.afs
              .collection('users')
              .doc(element.uid)
              .collection('events')
              .ref.get()
              .then((userEvents: any) => {
                // console.log('userEvents', userEvents);
                userEvents.forEach((event: any) => {
                  event = event.data();
                  // console.log('interval output', event);
                  let nowDate = new Date();
                  nowDate.setDate(nowDate.getDate() + 10);
                  let eventDate = new Date(event.startDate);
                  // console.log('nowDate', nowDate);
                  if (!event.mailSend) {
                    console.log('eventDate', eventDate, nowDate);
                    if (nowDate >= eventDate) {
                      console.log('Sending wishes to',element.email)
                      if (event.type == 'anniversary') {
                        this.sendAnniversaryEventMail(
                          element.email,
                          event.title,
                          event.startDate,
                          event.endDate
                        ).subscribe(
                          (res: any) => {
                            this.afs
                              .collection('users')
                              .doc(element.uid)
                              .collection('events')
                              .doc(event.eventId)
                              .update({ mailSend: true });
                          },
                          (err: any) => {
                            console.error(err.message);
                            this.authService.presentToast(err.message)
                          }
                        );
                      } else if (event.type == 'birthday') {
                        this.sendBirthdayEventMail(
                          element.email,
                          event.title,
                          event.startDate,
                          event.endDate
                        ).subscribe(
                          (data: any) => {
                            this.afs
                              .collection('users')
                              .doc(element.uid)
                              .collection('events')
                              .doc(event.eventId)
                              .update({ mailSend: true });
                          },
                          (error: any) => {
                            console.error(error.message);
                            this.authService.presentToast(error.message)}
                        );
                      }
                    }
                  }
                });
              });
          });
        });
      }
      await this.delay(60000);
    }
  }
  sendAnniversaryEventMail(mail, eventTitle, eventStart, eventEnd) {
    let body = `This is body with html <i>italic </i>. your event ${eventTitle} is starting on ${eventStart} and will end on ${eventEnd}`;
    let subject = `This is default subject with event ${eventTitle}`;
    console.log('sendAnniversaryEventMail', mail, eventTitle, eventStart, eventEnd);
    return this.mailService.sendMail(body, subject, mail);
  }
  sendBirthdayEventMail(mail, eventTitle, eventStart, eventEnd) {
    let body = `body is here ${eventTitle} ${eventStart} ${eventEnd}`;
    let subject = 'This is default subject';
    console.log('sendBirthdayEventMail', mail, eventTitle, eventStart, eventEnd);
    return this.mailService.sendMail(body, subject, mail);
  }
  init() {
    console.log('Initialising event notifier');
    this.start();
    this.event();
  }
  start() {
    this.eventLoop = true;
  }
  stop() {
    this.eventLoop = false;
  }
}
