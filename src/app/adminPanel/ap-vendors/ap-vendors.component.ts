import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ap-vendors',
  templateUrl: './ap-vendors.component.html',
  styleUrls: ['./ap-vendors.component.scss'],
})
export class APVendorsComponent implements OnInit {
  vendors=[]
  constructor(public afs: AngularFirestore,public authService:AuthService) { }

  ngOnInit() {
    this.afs.collection(`users`).valueChanges().subscribe((value) => {
      this.vendors=[]
      value.forEach((user:any) => {
        if (user.access.accessLevel === 'Vendor') {
          this.vendors.push(user);
        }
        console.log(user.access.accessLevel);
      }
    );
    })
  }

}
