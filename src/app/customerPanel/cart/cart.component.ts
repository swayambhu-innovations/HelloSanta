import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  screenwidth = window.innerWidth;
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    public dataProvider: DataProvider,
    private router: Router
  ) {}
  cartItems = [];
  checkoutItems = [];
  quantityChanged(event){
    console.log('event', event);
    this.checkoutItems.forEach((item: any, index: number) => {
      if(item.productId === event.productId){
        this.checkoutItems[index].quantity = event.quantity;
      }
    })
  }
  ngOnInit() {
    this.afs
      .collection('users')
      .doc(this.authService.userId)
      .valueChanges()
      .subscribe((doc: any) => {
        if (doc) {
          this.checkoutItems = doc.cartItems;
          console.log('doc data', doc);
          this.cartItems = [];
          doc.cartItems.forEach((item: any) => {
            console.log('item', item);
            this.afs
              .collection('products')
              .doc(item.productData)
              .ref.get()
              .then((prod: any) => {
                if (prod.data()) {
                  prod = prod.data();
                  prod['options'] = item.extraData;
                  prod['finalPrice'] = item.price;
                  prod['quantity'] = item.quantity;
                  this.cartItems.push(prod);
                }
              });
          });
        } else {
          console.log('no user data');
        }
      });
  }
  moveToCheckout() {
    this.dataProvider.showOverlay = true;
    console.log('checkout items', this.checkoutItems);
    this.dataProvider.checkOutdata = this.checkoutItems;
    this.router.navigate(['checkout']);
  }
}
