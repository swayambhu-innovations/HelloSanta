import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vp-profile',
  templateUrl: './vp-profile.component.html',
  styleUrls: ['./vp-profile.component.scss'],
})
export class VPProfileComponent implements OnInit {
  image="https://i.pravatar.cc/300"
  name="Randome Name"
  email="randomemail@host.com"
  dob="2015"
  totalProducts="43"
  totalSales="54366"
  revenue = "$ 48,000"
  sellerRank="43"
  constructor() { }

  ngOnInit() {}

}
