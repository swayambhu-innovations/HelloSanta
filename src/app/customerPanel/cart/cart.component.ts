import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(private afs: AngularFirestore,private authService: AuthService) { }
  cartItems=[]
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).valueChanges().subscribe((doc:any) => {
      if (doc){
        console.log('doc data', doc);
        doc.cartItems.forEach((item:any) => {
          console.log('item', item)
          this.afs.collection('products').doc(item.productData).valueChanges().subscribe((doc:any) => {
            doc['options']=item.extraData;
            this.cartItems.push(doc);
          })
        })
      } else {
        console.log('no user data');
      }
    })
  }
}
