import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-detail-pop',
  templateUrl: './shipping-detail-pop.component.html',
  styleUrls: ['./shipping-detail-pop.component.scss'],
})
export class ShippingDetailPopComponent implements OnInit {
  @Input() moreInfo:any;
  constructor() { }

  ngOnInit() {}

}
