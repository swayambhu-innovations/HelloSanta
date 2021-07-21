import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() totalCancelled:number = 0;
  @Input() image:string="";
  @Input() description:string;
  @Input() name:string="";
  @Input() price:string="";
  @Input() totalSales:string="";
  textlength:number=200;
  constructor() { }

  ngOnInit() {
    if (this.description.length>=this.textlength){
      this.description = this.description.substring(0,this.textlength) +"...";
    }
  }

}
