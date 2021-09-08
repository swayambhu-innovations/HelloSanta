import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-wide-product-card',
  templateUrl: './wide-product-card.component.html',
  styleUrls: ['./wide-product-card.component.css']
})
export class WideProductCardComponent implements OnInit {
  @Input() img:string =  "https://source.unsplash.com/650x940"
  @Input() orderTitle:string = "ArtWork Product"
  @Input() orderDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum."
  @Input() orderprice:number = 2300;
  @Input() category:string;
  @Input() subcategory:string;
  @Input() productId:string
  @Input() extras:any;
  @Input() orderconfig:string = "Chosen config"
  @Input() quantity:number = 1
  @Input() showQuantity:boolean = false;
  @Input() showImageInput:boolean = false;
  @Output() changeQuantity : EventEmitter<any> = new EventEmitter();
  @Output() addImage: EventEmitter<any> = new EventEmitter();
  constructor(public inventoryService: InventoryService,private authService: AuthService) { }
  changeImage(image){
    if (image.target.files[0].size < 500000){
      this.addImage.emit({productId:this.productId,image:image.target.files[0]});
      this.authService.presentToast("Image added successfully")
    } else {
      this.authService.presentToast("Image size should be less than 500kb",3000)
    }
  }
  removeFromWishlist(){
    let data = {
      productId: this.productId,
      category: this.category,
      subcategory: this.subcategory
    }
    this.inventoryService.removeFromWishlist(data);
  }
  removeQuantity(){
    this.quantity=this.quantity-1
    this.changeQuantity.emit({quantity:this.quantity,productId:this.productId});
  }
  addQuantity(){
    this.quantity=this.quantity+1
    this.changeQuantity.emit({quantity:this.quantity,productId:this.productId});
  }
  ngOnInit(){}

}
