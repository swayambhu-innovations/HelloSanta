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
  quantityChanged(event) {
    // // console.log('event', event);
    this.checkoutItems.forEach((item: any, index: number) => {
      // // console.log('item', item, event);
      if (item.identifier === event.ref) {
        // // console.log('item xyz', item);
        this.checkoutItems[index].quantity = event.quantity;
        this.afs
          .collection('users')
          .doc(this.authService.userId)
          .collection('cart')
          .doc(item.cartId)
          .update({ quantity: event.quantity });
      }
    });
  }
  removecartItem(event) {
    // // console.log('event', event);
    this.afs
      .collection('users')
      .doc(this.authService.userId)
      .collection('cart')
      .ref.get()
      .then((doc: any) => {
        // // console.log('undeifned data', doc);
        doc.forEach((item: any) => {
          // // console.log('doc', item.data());
          if (item.data().identifier === event.ref) {
            item.ref.delete();
            this.authService.presentToast('Item removed from cart');
            // // console.log('deleting item', item);
          }
        });
      });
  }
  ngOnInit() {
    this.afs
      .collection('users')
      .doc(this.authService.userId)
      .collection('cart')
      .valueChanges()
      .subscribe((doc: any) => {
        if (doc) {
          this.cartItems = [];
          doc.forEach((item: any) => {
            this.checkoutItems.push(item);
            // // console.log('item', item);
            this.afs
              .collection('products')
              .doc(item.productData)
              .ref.get()
              .then((prod: any) => {
                if (prod.data()) {
                  prod = prod.data();
                  prod['finalPrice'] = item.price;
                  prod['quantity'] = item.quantity;
                  prod['identifier'] = item.identifier;
                  // // console.log('item',item.extrasData)
                  let config = [];
                  for (let key of Object.keys(item.extrasData)){
                    let selection=item.extrasData[key];
                    if (
                      selection.type == 'textSel' ||
                      selection.type == 'imgSel'
                    ) {
                      config.push({
                        title: selection.sectionTitle,
                        value: selection.title,
                      });
                    } else if (selection.type == 'faceCount') {
                      config.push({ title: 'Faces', value: selection.faces });
                    }
                  }
                  prod['config'] = config;
                  // // console.log('prod', prod);
                  this.cartItems.push(prod);
                }
              });
          });
        } else {
          // // console.log('no user data');
        }
      });
  }
  moveToCheckout() {
    this.dataProvider.showOverlay = true;
    // // console.log('checkout items', this.checkoutItems);
    this.dataProvider.data = {"type":"cart"}
    this.dataProvider.checkOutdata = this.checkoutItems;
    this.router.navigate(['checkout']);
  }
}
