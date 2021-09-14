import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-product-full-card',
  templateUrl: './product-full-card.component.html',
  styleUrls: ['./product-full-card.component.css']
})
export class ProductFullCardComponent implements OnInit {
  @Input() img:any =  [{image:"https://source.unsplash.com/650x940"},{image:"https://source.unsplash.com/650x940"}];
  @Input() productTitle:string = "ArtWork Product"
  @Input() productDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum."
  @Input() price:string = "2300"
  @Input() category:string;
  @Input() subcategory:string;
  @Input() productId:string
  wishlist:any=this.authService.getCurrentWishlist();
  constructor(public inventoryService: InventoryService, public authService:AuthService) { }
  textlength=70;
  @ViewChild('icon') card: any;
  has(){
    let found = false;
    this.wishlist.forEach((item)=>{
      if(item == this.productId){
        found = true;
      }
    })
    return found;
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  addToWishlist(){
    this.card.el.classList.add('uk-animation-shake');
    if (this.has()){
      console.log("Already in wishlist removing it")
      this.inventoryService.removeFromWishlist(this.productId);
      this.wishlist.splice(this.wishlist.indexOf(this.productId),1);
      this.authService.presentToast("Removed from wishlist");
    } else {
      console.log("Adding to wishlist")
      this.inventoryService.addToWishlist(this.productId);
      this.wishlist.push(this.productId);
      this.authService.presentToast("Added to wishlist");
    }
    this.card.el.classList.add('uk-animation-shake');
  }
  ngOnInit(): void {
    if ( this.productDescription.length>=this.textlength){
      this.productDescription =  this.productDescription.substring(0,this.textlength) +"...";
    }
  }

}
