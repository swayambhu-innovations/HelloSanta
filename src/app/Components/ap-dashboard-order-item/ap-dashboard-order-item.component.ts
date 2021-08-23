import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ShippingDetailPopComponent } from 'src/app/popovers/shipping-detail-pop/shipping-detail-pop.component';

@Component({
  selector: 'app-ap-dashboard-order-item',
  templateUrl: './ap-dashboard-order-item.component.html',
  styleUrls: ['./ap-dashboard-order-item.component.scss'],
})
export class ApDashboardOrderItemComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }
  @Input() name: string;
  @Input() price: string;
  @Input() orderDate: string;
  @Input() status: string;
  @Input() moreInfo: string;
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
    console.log('onDidDismiss resolved with role', role);
  }
  ngOnInit() {}

}
