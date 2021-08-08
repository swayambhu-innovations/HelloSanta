import { Component, OnInit } from '@angular/core';
import { AddProductModalComponent } from 'src/app/modals/add-product-modal/add-product-modal.component';
import { ModalController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';
import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-ap-products',
  templateUrl: './ap-products.component.html',
  styleUrls: ['./ap-products.component.scss'],
})
export class APProductsComponent implements OnInit {
  constructor(public modalController: ModalController,
    private inventoryService: InventoryService,
    public afs: AngularFirestore,
    ) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
    });
    return await modal.present();
  }
  addProducts(){
    this.presentModal()
    console.log('add products');
  }
  deleteItem(){

  }
  editItem(){}
  allProducts={};
  products=[
    {
      "totalCancelled":20,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
    {
      "totalCancelled":203,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
    {
      "totalCancelled":20,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
    {
      "totalCancelled":3,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
    {
      "totalCancelled":20,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
    {
      "totalCancelled":320,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
    {
      "totalCancelled":203,
      "image":"https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "name": "Complete Painting",
      "price":"2500",
      "totalSales":"294"
    },
  ]
  allProds=[];
  ngOnInit() {
    this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
      this.allProds=[];
      value.categories.forEach((element:any) => {
        // console.log(value.categories.indexOf(element),"indexof")
        if (value.categories.indexOf(element)==0){
          // console.log("removing elements");
          this.allProds.length=0;
          // console.log(this.allProds.length)
        }
        this.afs.collection('products').doc(element.category)
        .collection('categories')
        .doc(element.subCategory)
        .collection('products').valueChanges().subscribe((proddata)=>{
          this.allProducts[element.category] = proddata;
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.allProds.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0) {
              this.allProds.push(product);
            }
          })
        })
      })
    });
  }

}
