import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { ShippingDetailPopComponent } from 'src/app/popovers/shipping-detail-pop/shipping-detail-pop.component';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-ap-orders-options-item', 
  templateUrl: './ap-orders-options-item.component.html',
  styleUrls: ['./ap-orders-options-item.component.scss'],
})
export class ApOrdersOptionsItemComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    public alertController: AlertController,
    private paymentService:PaymentService,
    private authService: AuthService,
    ) { }
  @Input() name: string;
  @Input() price: string;
  @Input() orderDate: string;
  @Input() status: string;
  @Input() moreInfo: any;
  @Input() productId: string;
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ShippingDetailPopComponent,
      event: ev,
      cssClass: 'ap-ship-popover',
      componentProps: {
        moreInfo:this.moreInfo,
      },
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  async presentContinueAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Are you sure to continue.',
      message:
        'This order will be rejected and will not be delivered to user.',
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
  async rejectOrder(){
    let res = await this.presentContinueAlert();
    if (res=='continue'){
      // console.log('continue')
      // console.log('shipment id',[this.moreInfo.shipment_id])  //shipment id
      this.paymentService.cancelOrderShipment({ids:[this.moreInfo.order_id]}).subscribe((value:any)=>{
        // console.log('cancel order shipment',value)
        this.authService.presentToast(JSON.parse(value.body).message);
      },(error)=>{
        this.authService.presentToast('Something went wrong. Error:'+error.message)
      })
    } else {
      // console.log('cancel')
    }
  }
  ngOnInit() {}

}
