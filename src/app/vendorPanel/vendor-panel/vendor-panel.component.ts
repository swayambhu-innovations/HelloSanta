import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-panel',
  templateUrl: './vendor-panel.component.html',
  styleUrls: ['./vendor-panel.component.scss'],
})
export class VendorPanelComponent implements OnInit {
  public appPages = [
    { title: 'Dashboard', url: '/VendorPanel/Dashboard', icon: 'home' },
    { title: 'Orders', url: '/VendorPanel/Order', icon: 'cube' },
    { title: 'Products', url: '/VendorPanel/Products', icon: 'grid' },
    { title: 'Issues', url: '/VendorPanel/Issues', icon: 'bug' },
    { title: 'Reviews', url: '/VendorPanel/Reviews', icon: 'chatbubbles' },
    { title: 'Feedback', url: '/VendorPanel/Feedback', icon: 'chatbox' },
    { title: 'Profile', url: '/VendorPanel/Profile', icon: 'person' },
  ];
  constructor() { }

  ngOnInit() {}

}