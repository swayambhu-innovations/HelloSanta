import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddCategoriesComponent } from 'src/app/modals/add-categories/add-categories.component';
import { AddProductModalComponent } from 'src/app/modals/add-product-modal/add-product-modal.component';
import { EditProductComponent } from 'src/app/modals/edit-product/edit-product.component';
import { SpecificProductsComponent } from 'src/app/popovers/specific-products/specific-products.component';
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
    public popoverController: PopoverController
  ) {}
  allProducts = {};
  products = [
    {
      totalCancelled: 20,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
    {
      totalCancelled: 203,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
    {
      totalCancelled: 20,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
    {
      totalCancelled: 3,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
    {
      totalCancelled: 20,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
    {
      totalCancelled: 320,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
    {
      totalCancelled: 203,
      image:
        'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ',
      name: 'Complete Painting',
      price: '2500',
      totalSales: '294',
    },
  ];
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
