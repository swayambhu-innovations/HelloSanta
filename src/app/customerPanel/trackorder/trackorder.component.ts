import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { MatStepper } from '@angular/material/stepper';
import { ModalController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';
import { InvoiceDetailComponent } from 'src/app/modals/invoice-detail/invoice-detail.component';
import { InvoiceService } from 'src/app/services/invoice.service';
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
    private invoiceService: InvoiceService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.shippingId = params.shippingId;
    });
  }
  presentInvoice() {
    let invoiceData = {
      shipping: {
        name: 'John Doe',
        address: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        postal_code: 94111,
      },
      items: [
        {
          item: 'TC 100',
          description: 'Toner Cartridge',
          quantity: 2,
          amount: 6000,
        },
        {
          item: 'USB_EXT',
          description: 'USB Cable Extender',
          quantity: 1,
          amount: 2000,
        },
      ],
      subtotal: 8000,
      paid: 0,
      invoice_nr: 1234,
    };
    
  }
  ngOnInit() {
    const shipmentID = this.shippingId || this.dataProvider.shippingData;
    if (shipmentID !== undefined) {
      // console.log('shipment function triggered ');
      this.paymentService
        .checkShipmentDetail(shipmentID)
        .subscribe((res: any) => {
          // console.log('check',res)
          this.shipmentOrderData = res.data;
          // console.log(this.shipmentOrderData);
          this.inventoryService
            .getOrder()
            .get()
            .then((order: any) => {
              // console.log(order);
              order.forEach((orderItem: any) => {
                if (orderItem.data().shipment_id == shipmentID) {
                  this.orderData = orderItem.data();
                  this.orderConfirmed = orderItem.data().orderConfirmed;
                  // console.log('orderData', this.orderData);
                }
              });
              // this.orderConfirmed = order.data().orderConfirmed;
            });
        });
    } else {
      this.authService.presentToast(
        'Page expired please go back to home and reinitiate this page'
      );
      // console.log(this.shippingId, shipmentID);
    }
  }
}
