import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vp-issues',
  templateUrl: './vp-issues.component.html',
  styleUrls: ['./vp-issues.component.scss'],
})
export class VPIssuesComponent implements OnInit {
  feedbacks=[1,2,3,4,5,6]
  constructor() { }

  ngOnInit() {}

}
