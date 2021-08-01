import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  image=""
  constructor(public authService:AuthService,public dataProvider:DataProvider) { }

  ngOnInit() {
    this.image=this.authService.getUserPhoto()
    this.authService.isUserAdmin();
  }

}
