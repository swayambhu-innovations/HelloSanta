import { Component, OnInit } from '@angular/core';
import { AddProductModalComponent } from 'src/app/modals/add-product-modal/add-product-modal.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';
import { first, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AddCategoriesComponent } from 'src/app/modals/add-categories/add-categories.component';
import { SpecificProductsComponent } from 'src/app/popovers/specific-products/specific-products.component';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
@Component({
  selector: 'app-ap-products',
  templateUrl: './ap-products.component.html',
  styleUrls: ['./ap-products.component.scss'],
})
export class APProductsComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public inventoryService: InventoryService,
    public afs: AngularFirestore,
    public popoverController: PopoverController
  ) {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      cssClass:"addProductModal"
    });
    return await modal.present();
  }
  async presentCategory() {
    const modal = await this.modalController.create({
      component: AddCategoriesComponent,
    });
    return await modal.present();
  }
  addProducts() {
    this.presentModal();
    console.log('add products');
  }
  async presentEditProductModal(id) {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      componentProps: {
        productId: id,
      }
    });
    return await modal.present();
  }
  async presentSpecificProductsPop(ev: any,id) {
    const popover = await this.popoverController.create({
      component: SpecificProductsComponent,
      event: ev,
      translucent: true,
      componentProps: {
        productId: id,
      }
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  deleteItem(id){
    console.log("deleting");
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${id}`);
    productRef.delete();
    console.log("deleted");
  }
  editItem(){
    this.presentModal()
  }
  allProds:any = [];
  ngOnInit() {
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata) => {
        this.allProds=proddata
        console.log(this.allProds);
      });
  }
}
