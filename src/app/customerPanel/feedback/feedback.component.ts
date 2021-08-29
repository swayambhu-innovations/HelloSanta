import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  starsize:string="20px";
  screenwidth=window.innerWidth;
  rating:any;
  optionsTitle:string="";
  options:any=[];
  constructor() { }

  ngOnInit() {
    if (this.screenwidth>=600) {
    this.starsize="50px";  
    }
  }
  onRate(event:{oldValue:number, newValue:number, starRating:StarRatingComponent}){
console.log("value", event.newValue);
this.rating=event.newValue;
if(this.rating==1){
this.optionsTitle=" What went so wrong?";
this.options=["Delivery","Packaging","Customer Satisfaction","Value For Money"];
}  
else if(this.rating==2){
  this.optionsTitle=" Help us improve where we lacked.";
  this.options=["Delivery","Packaging","Customer Satisfaction","Value For Money"];
  }
  else if(this.rating==3){
    this.optionsTitle=" What was optimistic about us?";
    this.options=["Delivery","Packaging","Customer Satisfaction","Value For Money"];
    }
    else if(this.rating==4){
      this.optionsTitle="What was good about us?";
      this.options=["Delivery","Packaging","Customer Satisfaction","Value For Money"];
      }
      else if(this.rating==5){
        this.optionsTitle=" What did we impress you with?";
        this.options=["Delivery","Packaging","Customer Satisfaction","Value For Money"];
        }
}
}

