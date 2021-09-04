import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vporders-summary-card',
  templateUrl: './vporders-summary-card.component.html',
  styleUrls: ['./vporders-summary-card.component.scss'],
})
export class VPOrdersSummaryCardComponent implements OnInit {
  @Input() price:string;
  @Input() description:string;
  @Input() items:any;
  @Input() purchaseDate:string;
  constructor() { }

  ngOnInit() {
    console.log(this.items,this.price,this.description,this.purchaseDate);
  }

}
