import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public appPages = [
    { title: 'Dashboard', url: '/AdminPanel/Dashboard', icon: 'home' },
    { title: 'Orders', url: '/AdminPanel/Order', icon: 'cube' },
    { title: 'Vendors', url: '/AdminPanel/Vendors', icon: 'people' },
    { title: 'Products', url: '/AdminPanel/Products', icon: 'grid' },
    { title: 'Pending Products', url: '/AdminPanel/PendingProducts', icon: 'golf' },
    { title: 'Users', url: '/AdminPanel/Users', icon: 'people-circle' },
    { title: 'Customize', url: '/AdminPanel/Customize', icon: 'cog' },
    { title: 'Complains', url: '/AdminPanel/Complains', icon: 'warning' },
    { title: 'Offers & Referrals', url: '/AdminPanel/OffersAndReferrals', icon: 'ticket' },
    { title: 'Blog', url: '/AdminPanel/Blog', icon: 'albums' },
    { title: 'Feedback', url: '/AdminPanel/Feedback', icon: 'chatbox' },
    { title: 'Analytics', url: '/AdminPanel/Analytics', icon: 'cellular' },
    { title: 'Login/Access', url: '/AdminPanel/LoginAccess', icon: 'key' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public dataProvider: DataProvider) { }
  ngOnInit() {}

}
