import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AddOfferComponent } from 'src/app/modals/add-offer/add-offer.component';
import { AddReferralComponent } from 'src/app/modals/add-referral/add-referral.component';

@Component({
  selector: 'app-ap-offers-referrals',
  templateUrl: './ap-offers-referrals.component.html',
  styleUrls: ['./ap-offers-referrals.component.scss'],
})
export class APOffersReferralsComponent implements OnInit {
  manageOffers=false;
  async showOfferModal() {
    const modal = await this.modalController.create({
      component: AddOfferComponent,
    });
    return await modal.present();
  }
  async showReferralModal() {
    const modal = await this.modalController.create({
      component: AddReferralComponent,
    });
    return await modal.present();
  }
  offers=[]
  referrals=[
    {
      "image":"https://i.pravatar.cc/250",
      "name":"Random Person",
      "referDate":"21/05/2021",
      "totalRefers":"532",
    },
    {
      "image":"https://i.pravatar.cc/250",
      "name":"Random Person",
      "referDate":"21/05/2021",
      "totalRefers":"532",
    },
    {
      "image":"https://i.pravatar.cc/250",
      "name":"Random Person",
      "referDate":"21/05/2021",
      "totalRefers":"532",
    },
    {
      "image":"https://i.pravatar.cc/250",
      "name":"Random Person",
      "referDate":"21/05/2021",
      "totalRefers":"532",
    },
    {
      "image":"https://i.pravatar.cc/250",
      "name":"Random Person",
      "referDate":"21/05/2021",
      "totalRefers":"532",
    },
    {
      "image":"https://i.pravatar.cc/250",
      "name":"Random Person",
      "referDate":"21/05/2021",
      "totalRefers":"532",
    },
  ]
  constructor(public modalController: ModalController,private afs: AngularFirestore) { }
  ngOnInit() {
    this.afs.collection('offers').valueChanges().subscribe(data => {
      this.offers=data
    })
  }
}
