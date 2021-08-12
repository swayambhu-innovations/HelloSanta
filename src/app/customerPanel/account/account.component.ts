import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public authService: AuthService,public afs: AngularFirestore) { }
  userName:string;
  userEmail:string;
  userImage: string;
  totalOrders: string;
  totalRefers: string;
  totalCashback: string;
  totalSales: string;
  liveOrders=[];
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).valueChanges().subscribe((value:any)=>{
      this.userName=value.displayName;
      this.userEmail=value.email;
      this.userImage=value.photoURL;
      this.totalOrders=value.totalOrders;
      this.totalRefers=value.totalReferred;
      this.totalCashback=value.totalCashback;
      this.totalSales=value.totalSalesPoints;
      this.liveOrders=value.currentOrder;
    })
  }
  products=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
  ]
}
