import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { DataProvider } from './providers/data.provider';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public alertController: AlertController,
    private afs: AngularFirestore,
    public authService: AuthService,
    private dataProvider: DataProvider
  ) {}
  prepareRoute(outlet: IonRouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  ngOnInit() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe((e) => {
        this.authService.presentToast('Internet connection is back')
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe((e) => {
        this.authService.presentToast('Internet connection lost')
      })
    );
  }
  onActivate(event) {
    console.log('Activate scroll');
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Report Bug !',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Your Message',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          },
        },
        {
          text: 'Report Bug',

          handler: (alertData) => {
            let date = new Date().toDateString();
            let data = {
              date: date,
              message: alertData.name1,
              url: window.location.href,
              clientInfo: window.navigator.userAgent,
              user: this.authService.userId || '',
              logs: this.dataProvider.logs,
              screenWidth: screen.width,
              screenHeight: screen.height,
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight,
              availWidth: screen.availWidth,
              availHeight: screen.availHeight,
              colorDepth: screen.colorDepth,
              pixelDepth: screen.pixelDepth,
              referrer: document.referrer,
              historyLength: history.length,
              title: document.title,
              browserName: window.navigator.userAgent,
              browserVersion: 'none',
              platform: 'none',
              userLanguage: navigator.language,
              userAgent: navigator.userAgent,
              cookieEnabled: navigator.cookieEnabled,
              onLine: navigator.onLine,
              javaEnabled: 'none',
              product: 'none',
              productSub: 'none',
              vendor: 'none',
              vendorSub: 'none',
              hardwareConcurrency: navigator.hardwareConcurrency,
              maxTouchPoints: navigator.maxTouchPoints,
              doNotTrack: navigator.doNotTrack,
              solved: false,
            };
            // console.log(data);
            this.afs
              .collection('bugs')
              .add(data)
              .then((docRef: any) => {
                this.afs
                  .collection('bugs')
                  .doc(docRef.id)
                  .set({ bugId: docRef.id }, { merge: true });
              });
          },
        },
      ],
    });
    await alert.present();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
