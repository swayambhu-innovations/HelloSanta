import {Component, Input, OnInit} from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

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
  @Input() category:string;
  @Input() subcategory:string;
  @Input() productId:string
  constructor(public inventoryService: InventoryService) { }
  textlength=70;
  addToWishlist(){
    let data = {
      productId: this.productId,
    }
    this.inventoryService.addToWishlist(data);
  }
  ngOnInit(): void {
    if ( this.productDescription.length>=this.textlength){
      this.productDescription =  this.productDescription.substring(0,this.textlength) +"...";
    }
  }

}
