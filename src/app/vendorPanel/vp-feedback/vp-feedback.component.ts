import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vp-feedback',
  templateUrl: './vp-feedback.component.html',
  styleUrls: ['./vp-feedback.component.scss'],
})
export class VPFeedbackComponent implements OnInit {
  feedbacks=[1,2,3,4,5,6]
  constructor() { }

  ngOnInit() {}

}
