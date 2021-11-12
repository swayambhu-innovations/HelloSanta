import { Injectable } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ShowOrderInfoComponent } from '../modals/show-order-info/show-order-info.component';
import { MoreInfoComponent } from '../popovers/more-info/more-info.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsModalService {

  constructor(public modalController: ModalController,public alertController: AlertController,private popoverController: PopoverController) { }
  async presentContinueAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure to continue.',
      message:
        'Are you sure to continue. All the data will be saved and will be live on the server.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Continue',
          role: 'continue',
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
  async presentCustomAlert(header,subHeader,message,buttons) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
  async showOrderInfo(data) {
    const popover = await this.popoverController.create({
      component: ShowOrderInfoComponent,
      componentProps: {
        order: data
      },
      cssClass: 'order-info',
      translucent: true
    });
    await popover.present();
  }
  async showInfo(ev,data){
    const popover = await this.popoverController.create({
      component: MoreInfoComponent,
      componentProps: {
        data: data
      },
      event: ev,
      translucent: true
    });
    await popover.present();
  }
}
