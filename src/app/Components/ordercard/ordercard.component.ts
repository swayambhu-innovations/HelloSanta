import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-ordercard',
  templateUrl: './ordercard.component.html',
  styleUrls: ['./ordercard.component.scss'],
})
export class OrdercardComponent implements OnInit {
  screenwidth=window.innerWidth
  @Input() orderid:string = "ArtWork Product"
  @Input() shipmentid:string = "2300"
  @Input() orderdate:string = "22/06/2021"
  @Input() shipmentstage:string = "ArtWork Product";
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
}
