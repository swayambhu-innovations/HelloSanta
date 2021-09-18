import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddCategoriesComponent } from 'src/app/modals/add-categories/add-categories.component';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
import { PendingProductModalComponent } from 'src/app/modals/pending-product-modal/pending-product-modal.component';
import { SpecificProductsComponent } from 'src/app/popovers/specific-products/specific-products.component';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-vp-products',
  templateUrl: './vp-products.component.html',
  styleUrls: ['./vp-products.component.scss'],
})
export class VPProductsComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public inventoryService: InventoryService,
    public afs: AngularFirestore,
    public popoverController: PopoverController
  ) {}
  async presentEditProductModal(id) {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      componentProps: {
        productId: id,
      }
    });
    return await modal.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PendingProductModalComponent,
      cssClass:"addProductModal"
    });
    return await modal.present();
  }
  
  deleteItem(id){
    // console.log("deleting");
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`pendingProducts/${id}`);
    productRef.delete();
    // console.log("deleted");
  }
  
  editItem(){
    this.presentModal()
  }
  allProducts = {};
  allProds = [];
  ngOnInit() {
    this.afs
      .collection('pendingProducts')
      .valueChanges()
      .subscribe((proddata) => {
        this.allProds=proddata
      });
  }

}
