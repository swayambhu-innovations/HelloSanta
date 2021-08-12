import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-user-promotion',
  templateUrl: './user-promotion.component.html',
  styleUrls: ['./user-promotion.component.scss'],
})
export class UserPromotionComponent implements OnInit {
  @Input() userid:string;
  constructor(private inventoryService:InventoryService) { }
  promoteToVendor(){
    console.log("Userid",this.userid)
    this.inventoryService.promoteTo('Vendor',this.userid);
  }
  promoteToCustomer(){
    console.log("Userid",this.userid)
    this.inventoryService.promoteTo('Customer',this.userid);
  }
  promoteToAdmin(){
    console.log("Userid",this.userid)
    this.inventoryService.promoteTo('Admin',this.userid);
  }
  ngOnInit() {}

}
