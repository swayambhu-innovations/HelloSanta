import { UserinfoComponent } from './../../popovers/userinfo/userinfo.component';
import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { CartinfoComponent } from 'src/app/popovers/cartinfo/cartinfo.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { SearchResultComponent } from 'src/app/popovers/search-result/search-result.component';
import { InventoryService } from 'src/app/services/inventory.service';
import { SearchComponent } from 'src/app/modals/search/search.component';
import { InvoiceService } from 'src/app/services/invoice.service';

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
    private modalController: ModalController,
    public invoiceService: InvoiceService,
  ) {}
  cartItems = [];
  categories;
  coins: number = 0;
  async presentSearch(event){
    console.log('presentSearch',event);
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'searchModal',
    })
    await modal.present();
  }
  ngOnInit() {
    this.image = this.authService.getUserPhoto();
    if (this.authService.isJustLoggedIn){
      this.afs
      .collection('users')
      .doc(this.authService.userId).collection('cart')
      .valueChanges()
      .subscribe((doc: any) => {
        this.cartItems =[];
        if (doc) {
          this.coins = doc.totalCashback;
          doc.forEach((item: any) => {
            this.afs
              .collection('products')
              .doc(item.productData)
              .ref.get()
              .then((doc: any) => {
                if (doc.exists) {
                  doc = doc.data();
                  // // console.log("doc item.finalPrice",item);
                  doc['finalPrice']=item.price;
                  doc['quantity']=item.quantity;
                  this.cartItems.push(doc);
                }
              });
          });
        } else {
          // // console.log('no user data');
        }
      });
    }
    this.inventoryService.getCategories().ref.get().then((doc:any)=>{
      if (doc.exists){
        this.categories = doc.data().categories;
      }
    });
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
    console.log('presentSearch',ev);
    const popover = await this.popoverController.create({
      component: SearchResultComponent,
      event: ev,
      translucent: true,
      cssClass: 'searchResult',
      showBackdrop:false,
      // backdropDismiss:false,
      // keyboardClose:true,
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
