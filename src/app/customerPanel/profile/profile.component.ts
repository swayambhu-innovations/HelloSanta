import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public authService: AuthService) { }
  userName:string;
  userEmail:string;
  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
  }

}
