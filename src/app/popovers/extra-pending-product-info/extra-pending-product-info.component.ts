import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-extra-pending-product-info',
  templateUrl: './extra-pending-product-info.component.html',
  styleUrls: ['./extra-pending-product-info.component.scss'],
})
export class ExtraPendingProductInfoComponent implements OnInit {
  @Input() productId: string;
  constructor(private afs: AngularFirestore) { }
  status: boolean;
  totalSales: number;
  totalCancels: number;
  totalStock: number;
  ngOnInit() {
    this.afs.doc(`pendingProducts/${this.productId}`).valueChanges().subscribe((value:any)=>{
      this.status=value.boolean;
      this.totalCancels=value.totalCancels;
      this.totalSales=value.totalSales;
      this.totalStock=value.totalStock;
    })
  }
}
