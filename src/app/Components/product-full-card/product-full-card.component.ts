import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-product-full-card',
  templateUrl: './product-full-card.component.html',
  styleUrls: ['./product-full-card.component.css']
})
export class ProductFullCardComponent implements OnChanges {
  @Input() img:any;
  @Input() productTitle:string = "ArtWork Product"
  @Input() productDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum.";
  @Input() price:string = "2300";
  @Input() productId:string;
  wishlist:any=this.authService.getCurrentWishlist();
  constructor(public inventoryService: InventoryService, public authService:AuthService) { }
  textlength=70;
  @ViewChild('icon') card: any;
  has(){
    let found = false;
    if (this.wishlist){
      if (this.wishlist.length > 0){
        this.wishlist.forEach((item)=>{
          if(item == this.productId){
            found = true;
          }
        })
      }
    }
    return found;
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  addToWishlist(){
    this.card.el.classList.add('uk-animation-scale-down');
    if (this.has()){
      // console.log("Already in wishlist removing it")
      this.inventoryService.removeFromWishlist(this.productId);
      this.wishlist.splice(this.wishlist.indexOf(this.productId),1);
      this.authService.presentToast("Removed from wishlist");
    } else {
      // console.log("Adding to wishlist")
      this.inventoryService.addToWishlist(this.productId);
      this.wishlist.push(this.productId);
      this.authService.presentToast("Added to wishlist");
    }
    this.card.el.classList.add('uk-animation-scale-down');
  }
  ngOnChanges(): void {
    // console.log('Changes occuring')
    // console.log(this.img,this.productTitle,this.productDescription,this.price,this.productId)
    if ( this.productDescription.length>=this.textlength){
      this.productDescription =  this.productDescription.substring(0,this.textlength) +"...";
    }
  }

}
