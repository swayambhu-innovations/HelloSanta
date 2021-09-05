import { UserinfoComponent } from './../../popovers/userinfo/userinfo.component';
import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular';
import { CartinfoComponent } from 'src/app/popovers/cartinfo/cartinfo.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { SearchResultComponent } from 'src/app/popovers/search-result/search-result.component';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  image = '';
  constructor(
    public authService: AuthService,
    public dataProvider: DataProvider,
    public popoverController: PopoverController,
    private afs: AngularFirestore,
    private inventoryService: InventoryService,
  ) {}
  cartItems = [];
  categories;
  coins: number = 0;
  ngOnInit() {
    this.image = this.authService.getUserPhoto();
    if (this.authService.isJustLoggedIn){
      this.afs
      .collection('users')
      .doc(this.authService.userId)
      .valueChanges()
      .subscribe((doc: any) => {
        if (doc) {
          this.coins = doc.totalCashback;
          doc.cartItems.forEach((item: any) => {
            this.afs
              .collection('products')
              .doc(item.productData)
              .ref.get()
              .then((doc: any) => {
                if (doc.exists) {
                  doc = doc.data();
                  let found = false;
                  this.cartItems.forEach((item: any) => {
                    if (item.productId == doc.productId) {
                      found = true;
                      item.quantity = item.quantity + 1;
                    }
                  });
                  if (!found) {
                    this.cartItems.push(doc);
                  }
                }
              });
          });
        } else {
          console.log('no user data');
        }
      });
    }
    this.inventoryService.getCategories().ref.get().then((doc:any)=>{
      if (doc.exists){
        this.categories = doc.data().categories;
      }
    });;
  }
  async presentUserinfo(ev: any) {
    const popover = await this.popoverController.create({
      component: UserinfoComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
  async presentSearchResult(ev: any) {
    const popover = await this.popoverController.create({
      component: SearchResultComponent,
      event: ev,
      translucent: true,
      cssClass: 'searchResult',
      componentProps: {
        keyword: ev.target.value,
      },
    });
    if (ev.target.value.length > 0) {
      await popover.present();
      const { role } = await popover.onDidDismiss();
    }
  }
  async presentCartinfo(ev: any) {
    const popover = await this.popoverController.create({
      component: CartinfoComponent,
      event: ev,
      translucent: true,
      cssClass: 'cartlist',
      componentProps: {
        products: this.cartItems,
      },
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
