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
    this.checkoutItems.forEach((item: any, index: number) => {
      if (item.identifier === event.ref) {
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
    this.afs
      .collection('users')
      .doc(this.authService.userId)
      .collection('cart')
      .ref.get()
      .then((doc: any) => {
        doc.forEach((item: any) => {
          if (item.data().identifier === event.ref) {
            item.ref.delete();
            this.authService.presentToast('Item removed from cart');
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
                  config = config.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                  });
                  prod['config'] = config;
                  this.cartItems.push(prod);
                }
              });
          });
        }
      });
  }
  moveToCheckout() {
    this.dataProvider.showOverlay = true;
    this.dataProvider.data = {"type":"cart"}
    this.dataProvider.checkOutdata = this.checkoutItems;
    this.router.navigate(['checkout']);
  }
}
