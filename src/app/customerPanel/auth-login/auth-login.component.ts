import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {

  constructor(public authService:AuthService,public dataProvider:DataProvider) { }

  ngOnInit() {
    this.dataProvider.showOverlay=false;
  }

}
