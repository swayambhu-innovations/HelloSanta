import { Component, Input, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
import { SpecificProductsComponent } from 'src/app/popovers/specific-products/specific-products.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() totalCancelled:number = 0;
  @Input() image:string="";
  @Input() description:string;
  @Input() name:string="";
  @Input() price:string="";
  @Input() totalSales:string="";
  @Input() id:string="";
  textlength:number=200;
  constructor(public afs: AngularFirestore,public modalController: ModalController,public popoverController: PopoverController) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      componentProps: {
        productId: this.id,
      }
    });
    return await modal.present();
  }
  async presentSpecificProductsPop(ev: any) {
    const popover = await this.popoverController.create({
      component: SpecificProductsComponent,
      event: ev,
      translucent: true,
      componentProps: {
        productId: this.id,
      }
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  removeProduct(){}
  deleteItem(){
    console.log("deleting");
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${this.id}`);
    productRef.delete();
    console.log("deleted");
  }
  editItem(){
    this.presentModal()
  }
  ngOnInit() {
    if (this.description.length>=this.textlength){
      this.description = this.description.substring(0,this.textlength) +"...";
    }
  }

}
