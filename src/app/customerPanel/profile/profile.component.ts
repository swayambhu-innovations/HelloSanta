import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(public authService: AuthService,private afs:AngularFirestore) { }
  userName:string;
  userEmail:string;
  changeField(event,type) {
    if (type=="firstName"){
      console.log(event.target.value);
      this.afs.collection('users').doc(this.authService.userId).set({displayName:event.target.value},{merge:true});
      this.authService.presentToast("Your name has been changed");
    } else if (type=='dob'){
      this.afs.collection('users').doc(this.authService.userId).set({dob:new Date(event.target.value.toString())},{merge:true});
      this.authService.presentToast("Your date of birth has been changed");
    } else if (type=='mobile'){
      this.afs.collection('users').doc(this.authService.userId).set({mobileNumber:event.target.value},{merge:true});
      this.authService.presentToast("Your mobile number has been changed");
    } else if (type=='gender'){
      this.afs.collection('users').doc(this.authService.userId).set({gender:event.target.value},{merge:true});
      this.authService.presentToast("Your gender has been changed");
    } else if (type=='country'){
      this.afs.collection('users').doc(this.authService.userId).set({country:event.target.value},{merge:true}); 
      this.authService.presentToast("Your country has been changed");
    }
  }
  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
  }

}
