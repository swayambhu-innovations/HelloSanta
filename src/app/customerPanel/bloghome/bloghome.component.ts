import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-bloghome',
  templateUrl: './bloghome.component.html',
  styleUrls: ['./bloghome.component.scss'],
})
export class BloghomeComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(private inventoryService: InventoryService,public afs: AngularFirestore) { }
  blogs=[]
  ngOnInit() {
    this.afs.collection('blog').valueChanges().subscribe((data) => {
      this.blogs=data;
    })
  }

}
