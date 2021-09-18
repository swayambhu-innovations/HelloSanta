import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertsModalService } from 'src/app/services/alerts-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-vp-dashboard',
  templateUrl: './vp-dashboard.component.html',
  styleUrls: ['./vp-dashboard.component.scss'],
})
export class VPDashboardComponent implements OnInit {
  totalOrders: number = 24;
  totalCancelled: number = 352;
  totalItems: number = 450;
  growthRate: number = 45;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private alertsModals: AlertsModalService
  ) {}
  orders = [];
  showOrderInfo(order) {
    this.alertsModals.showOrderInfo(order);
  }
  ngOnInit() {
    this.afs
      .collection('users')
      .ref.get()
      .then((data) => {
        data.forEach((user: any) => {
          // console.log(user.data());
          this.afs
            .collection('users')
            .doc(user.data().uid)
            .collection('orders')
            .ref.get()
            .then((ordersData) => {
              ordersData.forEach((order: any) => {
                // console.log('userOrder', order.data());
                let found = false;
                let products = [];
                order.data().products.forEach((product) => {
                  if (product.vendorId.includes(this.authService.userId)) {
                    products.push(product);
                    found=true;
                  }
                })
                if (found){
                  this.orders.push({
                    orderConfirmed: order.data().orderConfirmed,
                    orderId: order.data().orderId,
                    products: products,
                    orderMessage: order.data().orderMessage,
                    orderStage: order.data().orderStage,
                    shipment_id: order.data().shipment_id,
                    shippingDetail: order.data().shippingDetail,
                  })
                }
              });
            });
        });
      });
  }
}
