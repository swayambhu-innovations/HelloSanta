import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/modals/sort-modal/sort-modal.component';

@Component({
  selector: 'app-digitalartworks',
  templateUrl: './digitalartworks.component.html',
  styleUrls: ['./digitalartworks.component.scss'],
})
export class DigitalartworksComponent implements OnInit {

  screenwidth=window.innerWidth
  constructor(public modalController: ModalController,private afs: AngularFirestore) { }
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
  allDigitalProds= [];
  specifiedDigitalProds={};
  ngOnInit() {
    this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
      this.allDigitalProds=[];
      value.categories.forEach((element:any) => {
        if (element.category=="Digital Artworks"){
        // console.log(value.categories.indexOf(element),"indexof")
        if (value.categories.indexOf(element)==0){
          // console.log("removing elements");
          this.allDigitalProds.length=0;
          // console.log(this.allProds.length)
        }
        this.afs.collection('products').doc('Digital Artworks')
        .collection('categories')
        .doc(element.subCategory)
        .collection('products').valueChanges().subscribe((proddata)=>{
          this.specifiedDigitalProds[element.category] = proddata;
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.allDigitalProds.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0) {
              this.allDigitalProds.push(product);
            }
          })
        })
      } else {
        console.log("Digital category found",element.category)
      }
      })
    });
  }
  products=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
  ]

}
