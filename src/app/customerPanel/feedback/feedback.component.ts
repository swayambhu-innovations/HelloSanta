import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  starsize:string="20px";
  screenwidth=window.innerWidth;
  constructor() { }

  ngOnInit() {
    if (this.screenwidth>=600) {
    this.starsize="50px";  
    }

  }

}
