import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-ap-users',
  templateUrl: './ap-users.component.html',
  styleUrls: ['./ap-users.component.scss'],
})
export class APUsersComponent implements OnInit {
  users=[];
  constructor(public inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventoryService.getAllUsers().subscribe((value)=>{
      console.log(value)
      this.users=value;
    })
  }
  sendMsg(){
    alert('You need to disable this user from firebase console.')
  }
}
