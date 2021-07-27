import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpproduct-card',
  templateUrl: './vpproduct-card.component.html',
  styleUrls: ['./vpproduct-card.component.scss'],
})
export class VPProductCardComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  @Input() description: string;
  @Input() id: string;
  @Input() price: string;
  constructor() { }
  
  ngOnInit() {}

}
