import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-product-card',
  templateUrl: './small-product-card.component.html',
  styleUrls: ['./small-product-card.component.css']
})
export class SmallProductCardComponent implements OnInit {
  @Input() img:string =  "https://source.unsplash.com/650x940"
  @Input() productTitle:string = "ArtWork Product"
  @Input() price:string = "2300"
  @Input() date:string = "22/06/2021"
  @Input() productId:string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
