import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ap-offers-referrals',
  templateUrl: './ap-offers-referrals.component.html',
  styleUrls: ['./ap-offers-referrals.component.scss'],
})
export class APOffersReferralsComponent implements OnInit {
  offers=[
    {
      "offerId":"IODP4239847",
      "offerName":"10% Off",
      "offerCode":"GET10",
      "offerDiscount":"10%"
    },
    {
      "offerId":"IODP4239847",
      "offerName":"10% Off",
      "offerCode":"GET10",
      "offerDiscount":"10%"
    },
    {
      "offerId":"IODP4239847",
      "offerName":"10% Off",
      "offerCode":"GET10",
      "offerDiscount":"10%"
    },
    {
      "offerId":"IODP4239847",
      "offerName":"10% Off",
      "offerCode":"GET10",
      "offerDiscount":"10%"
    },
    {
      "offerId":"IODP4239847",
      "offerName":"10% Off",
      "offerCode":"GET10",
      "offerDiscount":"10%"
    },
    {
      "offerId":"IODP4239847",
      "offerName":"10% Off",
      "offerCode":"GET10",
      "offerDiscount":"10%"
    },
  ];
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
  constructor() { }
  ngOnInit() {}
}
