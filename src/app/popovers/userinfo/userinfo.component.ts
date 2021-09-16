import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent implements OnInit {
  totalCoin:any;
  constructor(private inventoryService: InventoryService,public popoverController: PopoverController) { }

  ngOnInit() {
    this.inventoryService.getUserInfo().ref.get().then((value:any)=>{
      if (value.exists){
        this.totalCoin = value.data().totalCashback;
        console.log(this.totalCoin,"totalCoin");
      }
    })
  }

}
