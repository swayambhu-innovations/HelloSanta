import { Component, Input, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
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
  @Input() category:string="";
  @Input() subcategory:string="";
  @Input() id:string="";
  textlength:number=200;
  constructor(public afs: AngularFirestore,public modalController: ModalController,) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: EditProductComponent,
      componentProps: {
        productId: this.id,
        productCategory: this.category,
        productSubcategory: this.subcategory,
      }
    });
    return await modal.present();
  }
  removeProduct(){}
  deleteItem(){
    console.log("deleting");
    const productRef: AngularFirestoreDocument<any> = this.afs.doc(`products/${this.category}/categories/${this.subcategory}/products/${this.id}`);
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
