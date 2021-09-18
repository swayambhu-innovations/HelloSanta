import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-ordercard',
  templateUrl: './ordercard.component.html',
  styleUrls: ['./ordercard.component.scss'],
})
export class OrdercardComponent implements OnInit {
  screenwidth=window.innerWidth
  @Input() orderid:string = "ArtWork Product"
  @Input() shipmentid:string = "2300"
  @Input() orderdate:string = "22/06/2021"
  @Input() shipmentstage:string = "ArtWork Product";
  @Input() liveOrders:any;
  @Input() customWidth:string = undefined;
  constructor(public authService: AuthService,public afs: AngularFirestore) { }
  ngOnInit() {
    // console.log(this.liveOrders)
  }
}
