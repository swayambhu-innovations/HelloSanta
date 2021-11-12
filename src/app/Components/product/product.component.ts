import { Component, Input, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
import { SpecificProductsComponent } from 'src/app/popovers/specific-products/specific-products.component';
import { AlertsModalService } from 'src/app/services/alerts-modal.service';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(public afs: AngularFirestore,private authService : AuthService,public modalController: ModalController,public popoverController: PopoverController, public alertsModals: AlertsModalService) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      cssClass:"addEditProductModal",
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
    // console.log('onDidDismiss resolved with role', role);
  }
  removeProduct(){}
  async deleteItem(){
    // console.log("deleting");
    const role = await this.alertsModals.presentCustomAlert(
      "Alert","Deleting product",
      'Are you sure you wan to delete '+this.name + ' product from your databases.',
      [{
        text:'Yes, Delete Product',
        role:'yes'
      },{
        text:'Cancel',
        role:'cancel'
      }]
      )
      console.log("Role",role);
    if (role=="yes"){
      this.afs.collection("products").doc(this.id).delete();
      this.authService.presentToast("Product deleted successfully");
    }else{
      this.authService.presentToast("Product not deleted");
    }
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
