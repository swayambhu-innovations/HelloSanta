import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { MatStepper } from '@angular/material/stepper';
import { ModalController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';
import { InvoiceDetailComponent } from 'src/app/modals/invoice-detail/invoice-detail.component';
@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.scss'],
})
export class TrackorderComponent implements OnInit {
  // @ViewChild("step1") stepper:MatStepper;
  // @ViewChild("step2") stepper:MatStepper;
  // @ViewChild("step3") stepper:MatStepper;
  // @ViewChild("step4") stepper:MatStepper;
  orderPlaced = true;
  orderConfirmed = false;
  orderCancelled = false;
  orderCompleted = false;
  orderStatus: any;
  orderDelivered: boolean;
  orderData;
  isLinear = true;
  screenwidth = window.innerWidth;
  shippingId: string;
  shipmentOrderData: any = {};
  isLoaded: any;
  constructor(
    private dataProvider: DataProvider,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private inventoryService: InventoryService,
    public modalController: ModalController,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.shippingId = params.shippingId;
    });
  }
  async presentInvoice() {
    const modal = await this.modalController.create({
      component: InvoiceDetailComponent,
      cssClass:'invoiceModal'
    });
    return await modal.present();
  }
  ngOnInit() {
    const shipmentID = this.shippingId || this.dataProvider.shippingData;
    if (shipmentID !== undefined) {
      console.log('shipment function triggered ');
      this.paymentService
        .checkShipmentDetail(shipmentID)
        .subscribe(async (res: any) => {
          this.shipmentOrderData = JSON.parse(res.body);
          console.log(this.shipmentOrderData);
          this.inventoryService.getOrder().get().then((order: any) => {
            console.log(order);
            order.forEach((orderItem: any) => {
              console.log("orderids",orderItem.data(),orderItem.data().shipment_id,shipmentID);
              if (orderItem.data().shipment_id==shipmentID){
                this.orderData=orderItem.data();
                this.orderConfirmed = orderItem.data().orderConfirmed;
                console.log("orderData",this.orderData);
              }
            });
            // this.orderConfirmed = order.data().orderConfirmed;
          });
        });
    } else {
      this.authService.presentToast(
        'Page expired please go back to home and reinitiate this page'
      );
      console.log(this.shippingId, shipmentID);
    }
  }
}
