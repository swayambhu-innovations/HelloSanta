import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-user-referral',
  templateUrl: './user-referral.component.html',
  styleUrls: ['./user-referral.component.scss'],
})
export class UserReferralComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(private authService: AuthService,private inventoryService: InventoryService,private afs: AngularFirestore) { }
  referralState(value){
    this.authService.presentToast("Changes saved")
    if (value.detail.checked){
      this.inventoryService.optInreferral();
    } else {
      this.inventoryService.optOutReferral();
    }
  }
  users=[]
  ngOnInit() {
    this.afs.firestore.collection('users').get().then((value:any)=>{
      this.users=value.docs.map((doc)=>{
        return doc.data()
      })
    })
  }

}
