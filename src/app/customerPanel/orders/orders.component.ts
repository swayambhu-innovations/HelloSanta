import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public authService: AuthService,public afs: AngularFirestore) { }
  liveOrders=[];
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).valueChanges().subscribe((value:any)=>{
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
