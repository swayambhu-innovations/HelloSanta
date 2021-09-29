import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddCategoriesComponent } from 'src/app/modals/add-categories/add-categories.component';
import { AddProductModalComponent } from 'src/app/modals/add-product-modal/add-product-modal.component';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
import { SpecificProductsComponent } from 'src/app/popovers/specific-products/specific-products.component';
import { AlertsModalService } from 'src/app/services/alerts-modal.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-pending-products',
  templateUrl: './pending-products.component.html',
  styleUrls: ['./pending-products.component.scss'],
})
export class PendingProductsComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    public inventoryService: InventoryService,
    public afs: AngularFirestore,
    public popoverController: PopoverController,
    public alertsModals: AlertsModalService,
  ) {}
  customProds=[];
  allProducts = {};
  allProds = [];
  ngOnInit() {
    this.afs
      .collection('pendingProducts')
      .valueChanges()
      .subscribe((proddata) => {
        this.allProds=proddata
      });
    this.afs.collection('customProducts').valueChanges().subscribe((proddata) => {
      this.customProds=[];
      console.log(proddata);
      proddata.forEach((prod) => {
        this.customProds.push(prod);
      })
    })
  }
}
