import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public authService: AuthService,public afs: AngularFirestore) { }
  liveOrders=[];
  loading=true;
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).collection('orders').ref.get().then((value:any)=>{
      value.forEach((order:any)=>{
        order = order.data();
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

  products=[]
}
