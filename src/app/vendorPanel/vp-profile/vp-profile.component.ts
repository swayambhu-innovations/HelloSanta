import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-vp-profile',
  templateUrl: './vp-profile.component.html',
  styleUrls: ['./vp-profile.component.scss'],
})
export class VPProfileComponent implements OnInit {
  image:string;
  name:string;
  email:string;
  dob:string;
  totalProducts=0
  totalSold=0
  totalOrders = 0
  totalCancelled=0
  constructor(private authService: AuthService,private inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventoryService.getUserInfo().ref.get().then((res:any)=>{
      this.totalProducts=res.data().access.levelData.totalProducts
      this.totalSold=res.data().access.levelData.totalSold
      this.totalOrders=res.data().access.levelData.totalOrders
      this.totalCancelled=res.data().access.levelData.totalCancelled
      this.image=res.data().photoURL
      this.name=res.data().displayName
      this.email=res.data().email
      this.dob=(new Date(res.data().dob)).toDateString()
    })
  }

}
