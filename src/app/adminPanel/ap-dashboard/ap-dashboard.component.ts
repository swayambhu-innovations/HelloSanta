import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ap-dashboard',
  templateUrl: './ap-dashboard.component.html',
  styleUrls: ['./ap-dashboard.component.scss'],
})
export class APDashboardComponent implements OnInit {
  totalOrders: number=24;
  totalCancelled: number=352;
  totalItems: number=450;
  growthRate: number=45; 
  loading:boolean = true;
  liveOrders=[];
  constructor(private afs: AngularFirestore,private authService: AuthService,) { } 
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).ref.get().then((value:any)=>{
      value.data().orders.forEach((order:any)=>{
        let productsData=[];
        order.products.forEach((product:any)=>{
          this.afs.collection('products').doc(product.productId).ref.get().then((productValue:any)=>{
            productsData.push(productValue.data());
            this.loading=false;
          })
        })
        this.liveOrders.push({products:productsData,shippingDetail:order.shippingDetail})
      });
      console.log(this.liveOrders);
    })
  }
}
