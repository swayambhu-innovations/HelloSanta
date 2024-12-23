import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ap-orders',
  templateUrl: './ap-orders.component.html',
  styleUrls: ['./ap-orders.component.scss'],
})
export class APOrdersComponent implements OnInit {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}
  loading: boolean = true;
  liveOrders = [];
  oldOrders = [];
  ngOnInit() {
    this.afs
      .collection('users')
      .doc(this.authService.userId).collection('orders')
      .ref.get()
      .then((value: any) => {
        value.forEach((order: any) => {
          order = order.data();
          if (order.orderStage == 'live') {
            let productsData = [];
            order.products.forEach((product: any) => {
              this.afs
                .collection('products')
                .doc(product.productId)
                .ref.get()
                .then((productValue: any) => {
                  if (productValue.exists) {
                    productsData.push(productValue.data());
                    this.loading = false;
                  }
                });
            });
            this.liveOrders.push({
              products: productsData,
              shippingDetail: order.shippingDetail,
            });
          } else if (order.orderStage == 'delivered') {
            let productsData = [];
            order.products.forEach((product: any) => {
              this.afs
                .collection('products')
                .doc(product.productId)
                .ref.get()
                .then((productValue: any) => {
                  if (productValue.exists) {
                    productsData.push(productValue.data());
                    this.loading = false;
                  }
                });
            });
            this.oldOrders.push({
              products: productsData,
              shippingDetail: order.shippingDetail,
            });
          }
        });
        // console.log(this.liveOrders);
      });
  }
}
