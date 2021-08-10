import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public inventoryService: InventoryService,public afs: AngularFirestore,public authService:AuthService) { }
  wishlist=[];
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).valueChanges().subscribe((value:any)=>{
      this.wishlist=[];
      value.wishlist.forEach((element:any) => {
        // console.log(value.categories.indexOf(element),"indexof")
        if (value.wishlist.indexOf(element)==0){
          // console.log("removing elements");
          this.wishlist.length=0;
          // console.log(this.allProds.length)
        }
        this.afs.collection('products').doc(element.category)
        .collection('categories')
        .doc(element.subcategory)
        .collection('products').doc(element.productId).valueChanges().subscribe((proddata)=>{
          let unknown=0
          this.wishlist.forEach((elem:any) => {
            console.log(elem.productId,proddata.productId,elem.subcategory==proddata.subcategory)
            if (proddata.productId==elem.productId) {
              console.log("already exists");
              unknown++;
            }
          })
          if (unknown==0) {
            this.wishlist.push(proddata);
          }
          console.log("wishlist",this.wishlist);
        })
      })
    });
  }

  orders=[
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
