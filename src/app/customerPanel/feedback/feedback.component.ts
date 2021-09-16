import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  starsize: string = '30px';
  screenwidth = window.innerWidth;
  rating: any;
  optionsTitle: string = '';
  options: any = [];
  orderId: string;
  orderData:any;
  values:any={'sel':{}}
  shipment_id: any;
  clicked:any=[];
  trackOrder:any;
  refreshRating:boolean=true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private formbuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.orderId = params['orderId'];
      this.trackOrder = params['trackId']
    });
    this.form = this.formbuilder.group({
      starCount: this.StarCount,
      moreInfo: this.moreInfo,
    });
  }
  form: FormGroup;
  StarCount: FormControl = new FormControl('', [Validators.required,]);
  moreInfo: FormControl = new FormControl();
  ngOnInit() {
    if (this.orderId){
      this.inventoryService.getOrder().get().then((snapshot:any) => {
        snapshot.forEach((doc:any) => {
          if (this.orderId == doc.data().orderId){
            this.orderData = doc.data()
            this.shipment_id = doc.data().shipment_id
            console.log(this.orderData)
          }
        })
      })
    }
    if (this.screenwidth >= 600) {
      this.starsize = '50px';
    }
  }
  log(event) {
    console.log(event);
  }
  submitFeedback(){
    console.log('submitFeedback');
    console.log(this.moreInfo.value);
    console.log(this.StarCount.value)
    console.log(this.values)
    let feedback = {
      stars:this.StarCount.value,
      moreInfo:this.moreInfo.value,
      options:this.values,
      name:this.authService.getUserName(),
      email:this.authService.getUserEmail(),
      photoURL:this.authService.getUserPhoto(),
      userId: this.authService.userId,
    }
    if (this.orderId){
      this.inventoryService.addProductFeedback(this.orderId,feedback)
    } else {
      this.inventoryService.addWebsiteFeedback(feedback)
    }
    this.router.navigateByUrl(
      'trackorder?shippingId=' +this.trackOrder.toString()
    );
  }
  onRate(event) {
    this.values={};
    this.refreshRating=false;
    console.log('value', event.newValue);
    this.rating = event.newValue;
    this.StarCount.setValue(event.newValue)
    if (this.rating == 1) {
      this.optionsTitle = ' What went so wrong?';
      this.options = [
        'Delivery',
        'Packaging',
        'Customer Satisfaction',
        'Value For Money',
      ];
    } else if (this.rating == 2) {
      this.optionsTitle = ' Help us improve where we lacked.';
      this.options = [
        'Delivery',
        'Packaging',
        'Customer Satisfaction',
        'Value For Money',
      ];
    } else if (this.rating == 3) {
      this.optionsTitle = ' What was optimistic about us?';
      this.options = [
        'Delivery',
        'Packaging',
        'Customer Satisfaction',
        'Value For Money',
      ];
    } else if (this.rating == 4) {
      this.optionsTitle = 'What was good about us?';
      this.options = [
        'Delivery',
        'Packaging',
        'Customer Satisfaction',
        'Value For Money',
      ];
    } else if (this.rating == 5) {
      this.optionsTitle = ' What did we impress you with?';
      this.options = [
        'Delivery',
        'Packaging',
        'Customer Satisfaction',
        'Value For Money',
      ];
    }
    this.values[this.optionsTitle]={}
    this.refreshRating=true;
  }
}
