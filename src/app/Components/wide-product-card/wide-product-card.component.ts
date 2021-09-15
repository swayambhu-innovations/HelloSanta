import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-wide-product-card',
  templateUrl: './wide-product-card.component.html',
  styleUrls: ['./wide-product-card.component.css']
})
export class WideProductCardComponent implements OnInit,OnChanges  {
  @Input() img:any;
  @Input() orderTitle:string = "ArtWork Product"
  @Input() orderDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum."
  @Input() orderprice:number = 2300;
  @Input() category:string;
  screenwidth = window.innerWidth;
  @Input() subcategory:string;
  @Input() productId:string
  @Input() extras:any;
  @Input() orderconfig:string = "Order Config"
  @Input() quantity:number = 1;
  @Input() identifier:string="";
  @Input() configData:any;
  db:any={};
  @Input() showConfig:boolean = true;
  @Input() showActions:boolean = true;
  @Input() showQuantity:boolean = false;
  @Input() showImageInput:boolean = false;
  @Output() changeQuantity : EventEmitter<any> = new EventEmitter();
  @Output() addImage: EventEmitter<any> = new EventEmitter();
  @Output() removeEvent: EventEmitter<any> = new EventEmitter();
  constructor(public inventoryService: InventoryService,private authService: AuthService,private dataProvider: DataProvider) { }
  changeImage(image){
    if (image.target.files[0].size < 500000){
      this.dataProvider.data=this.identifier;
      const a:any = {productId:this.productId,image:image.target.files[0],refData:this.identifier}
      console.log("Event logging just before emitting the event from function changeImage(event)",this.identifier)
      this.addImage.emit(a);
      this.authService.presentToast("Image added successfully")
    } else {
      this.authService.presentToast("Image size should be less than 500kb",3000)
    }
  }
  removeFromWishlist(){
    this.removeEvent.emit({productId:this.productId,ref:this.identifier})
  }
  removeQuantity(){
    this.quantity=this.quantity-1
    this.changeQuantity.emit({quantity:this.quantity,productId:this.productId,ref:this.identifier});
  }
  addQuantity(){
    this.quantity=this.quantity+1
    this.changeQuantity.emit({quantity:this.quantity,productId:this.productId,ref:this.identifier});
  }
  ngOnInit(){
    console.log('Event value emitted from ngOnInit()',this.identifier)
  } 
  ngOnChanges(){
    console.log('Event value emitted from OnChanges() from child component',this.identifier)
  }
}
