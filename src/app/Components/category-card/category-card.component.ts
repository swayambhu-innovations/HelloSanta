import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() img:any =  [{image:"https://source.unsplash.com/650x940"},{image:"https://source.unsplash.com/650x940"}]
  @Input() categoryTitle:string = "ArtWork Product"
  @Input() category:string;
  @Input() subcategory:string;
  @Input() productId:string;
  @Input() price:string;
  wishlist:any=this.authService.getCurrentWishlist();
  hover:boolean=false;
  @ViewChild('icon') card: any;
  constructor(public authService: AuthService,private inventoryService: InventoryService) { }
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
  async addToWishlist(){
    this.card.el.classList.add('uk-animation-shake');
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
    await this.delay(1000);
    this.card.el.classList.remove('uk-animation-shake')
  }
  ngOnInit(){

  }

}
