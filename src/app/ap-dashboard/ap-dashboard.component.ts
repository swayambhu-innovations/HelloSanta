import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ap-dashboard',
  templateUrl: './ap-dashboard.component.html',
  styleUrls: ['./ap-dashboard.component.scss'],
})
export class APDashboardComponent implements OnInit {
  totalOrders: number=24;
  totalCancelled: number=352;
  totalItems: number=450;
  growthRate: number=45;  
  constructor() { } 

  ngOnInit() {}

}
