import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { ExtraPendingProductInfoComponent } from 'src/app/popovers/extra-pending-product-info/extra-pending-product-info.component';
import { PendingProductEditModalComponent } from 'src/app/modals/pending-product-edit-modal/pending-product-edit-modal.component';

@Component({
  selector: 'app-vpproduct-card',
  templateUrl: './vpproduct-card.component.html',
  styleUrls: ['./vpproduct-card.component.scss'],
})
export class VPProductCardComponent implements OnInit {
  @Input() name: string;
  @Input() image: string;
  @Input() description: string;
  @Input() id: string;
  @Input() price: string;
  constructor(public afs: AngularFirestore,public modalController: ModalController,private popoverController: PopoverController) { }
  async moreInfo(){
    const modal = await this.popoverController.create({
      component: ExtraPendingProductInfoComponent,
      componentProps: {
        productId: this.id,
      }
    });
    return await modal.present();
  }
  async presentEditProductModal(id) {
    const modal = await this.modalController.create({
      component: PendingProductEditModalComponent,
      componentProps: {
        productId: id,
      }
    });
    return await modal.present();
  }
  deleteItem(id){
    this.afs.doc(`pendingProducts/${id}`).ref.delete();
  }
  ngOnInit() {}

}
