import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/modals/sort-modal/sort-modal.component';
@Component({
  selector: 'app-handmadeartworks',
  templateUrl: './handmadeartworks.component.html',
  styleUrls: ['./handmadeartworks.component.scss'],
})
export class HandmadeartworksComponent implements OnInit {
screenwidth=window.innerWidth
  constructor(public modalController: ModalController,private afs: AngularFirestore,) { }
  async presentFilter() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
    });
    return await modal.present();
  }
  async presentsort() {
    const modal = await this.modalController.create({
      component: SortModalComponent,
    });
    return await modal.present();
  }
  allHandmadeProds=[]
  specifiedHandmadeProds={}
  ngOnInit() {
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata) => {
        console.log('products data digital', proddata);
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.allHandmadeProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (unknown == 0 && product.productCategory.includes('Handmade Products')) {
            this.allHandmadeProds.push(product);
          }
        });
      });
  }

}
