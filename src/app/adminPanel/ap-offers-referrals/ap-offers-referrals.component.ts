import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AddOfferComponent } from 'src/app/modals/add-offer/add-offer.component';
import { AddReferralComponent } from 'src/app/modals/add-referral/add-referral.component';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(public modalController: ModalController,private authService: AuthService,private afs: AngularFirestore,private dataProvider: DataProvider) { }
  ngOnInit() {
    this.afs.collection('offers').snapshotChanges().subscribe((data:any) => {
      this.offers=[]
      data.forEach(doc => {
        console.log(doc.payload.doc.data())
        let dat = doc.payload.doc.data()
        dat['offerId']=doc.payload.doc.id
        if (this.offers.length>0) {
          let found = false
          this.offers.forEach(offer => {
            if (offer.offerId==dat.offerId) {
              found = true
            }
          })
          if (!found) {
            this.offers.push(dat)
          }
        } else {
          this.offers.push(dat)
        }
      })
    })
  }
  toggleManage(){
    this.manageOffers=!this.manageOffers
    if (this.manageOffers) {
      this.authService.presentToast('You can now delete offers')
    } else {
      this.authService.presentToast('Offer delete buttons are hidden')
    }
  }
  async deleteOffer(id,offerName){
    let res = await this.dataProvider.presentContinueAlert('You are going to delete "'+offerName+'" offer')
    if (res=='continue') {
      this.afs.collection('offers').doc(id).delete()
      this.authService.presentToast('Offer deleted successfully')
    } else {
      this.authService.presentToast('Offer not deleted')
    }
  }
}
