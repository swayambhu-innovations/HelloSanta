import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  starsize: string = '20px';
  screenwidth = window.innerWidth;
  rating: any;
  optionsTitle: string = '';
  options: any = [];
  orderId: string;
  orderData:any;
  constructor(private activatedRoute: ActivatedRoute,private inventoryService: InventoryService) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.orderId = params['orderId'];
    });
  }

  ngOnInit() {
    if (this.orderId){
      this.inventoryService.getUserInfo().ref.get().then((doc:any)=>{
        if (doc.exists){
          doc.data().orders.forEach((order)=>{
            if (order.orderId == this.orderId){
              this.orderData = order;
            }
          })
        }
      });
    }
    if (this.screenwidth >= 600) {
      this.starsize = '50px';
    }
  }
  submitFeedback(){

  }
  onRate(event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    console.log('value', event.newValue);
    this.rating = event.newValue;
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
  }
}
