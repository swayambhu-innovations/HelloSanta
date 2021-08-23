import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { MatStepper } from '@angular/material/stepper';
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
  orderPlaced:boolean=true;
  orderConfirmed:boolean=false;
  orderStatus:any;
  orderDelivered:boolean;
  isLinear = false;
  screenwidth=window.innerWidth;
  shippingId:string;
  shipmentOrderData:{}={};
  isLoaded:any;
  constructor(
    private dataProvider: DataProvider,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.shippingId = params['shippingId'];
    });
  }

  ngOnInit() {
    var shipmentID = this.shippingId || this.dataProvider.shippingData;
    if (shipmentID!=undefined){
      this.paymentService.checkShipmentDetail(shipmentID).subscribe((res:any)=>{
        console.log(res,typeof res);
        this.shipmentOrderData=JSON.parse(res.body);
        console.log(this.shipmentOrderData);
      })
    } else {
      this.authService.presentToast("Page expired please go back to home and reinitiate this page");
      console.log(this.shippingId,shipmentID);
    }
  }
// next(){
//     this.orderConfirmed=true;
//     stepper.next()
// }
}
