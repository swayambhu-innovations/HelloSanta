import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-full-card',
  templateUrl: './product-full-card.component.html',
  styleUrls: ['./product-full-card.component.css']
})
export class ProductFullCardComponent implements OnInit {
  @Input() img:string =  "https://source.unsplash.com/650x940"
  @Input() productTitle:string = "ArtWork Product"
  @Input() productDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum."
  @Input() price:string = "2300"
  constructor() { }
  textlength=120;
  ngOnInit(): void {
    if ( this.productDescription.length>=this.textlength){
      this.productDescription =  this.productDescription.substring(0,this.textlength) +"...";
    }
  }

}
