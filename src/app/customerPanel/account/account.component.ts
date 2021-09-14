import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopoverController } from '@ionic/angular';
import { AddSocialAccountComponent } from 'src/app/popovers/add-social-account/add-social-account.component';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public inventoryService: InventoryService,public authService: AuthService,public afs: AngularFirestore,private popoverController: PopoverController) { }
  userName:string;
  userEmail:string;
  userImage: string;
  totalOrders: string;
  totalRefers: string;
  totalCashback: string;
  totalCoins: string;
  country:string;
  type: string;
  dob: string;
  emailVerified: string;
  gender: string;
  isReferrer: string;
  mobileNumber: string;
  uid: string;
  liveOrders=[];
  socialAccounts=[];
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: AddSocialAccountComponent,
      event: ev,
      translucent: true,
      componentProps: {
        userId: this.authService.userId,
      }
    });
    return await popover.present();
  }
  ngOnInit() {
    this.afs.collection('users').doc(this.authService.userId).valueChanges().subscribe((value:any)=>{
      this.userName=value.displayName;
      this.userEmail=value.email;
      this.userImage=value.photoURL;
      this.totalOrders=value.totalOrders;
      this.totalRefers=value.totalReferred;
      this.totalCashback=value.totalCashback;
      this.totalCoins=value.totalSalesPoints;
      this.liveOrders=value.currentOrder;
      this.socialAccounts=value.socialMedia;
      this.country=value.country;
      this.type=value.access.accessLevel;
      this.dob=(new Date(value.dob)).toDateString();
      this.emailVerified=value.emailVerified;
      this.gender=value.gender;
      if (value.isReferrer){
        this.isReferrer=value.referralCode;
      }
      this.mobileNumber=value.mobileNumber;
      this.uid = value.uid;
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
