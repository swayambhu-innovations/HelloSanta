import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss'],
})
export class FeedbackCardComponent implements OnInit {
  @Input() title:string=""
  @Input() description:string=""
  @Input() image: string=""
  
  constructor() { }

  ngOnInit() {}

}
