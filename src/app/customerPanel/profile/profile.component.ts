import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, last, switchMap } from 'rxjs/operators';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  screenwidth = window.innerWidth;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    public authService: AuthService,
    private afs: AngularFirestore,
    public dataProvider: DataProvider,
    private router: Router,
    private storage: AngularFireStorage
  ) {}
  userName: string;
  userEmail: string;
  changeField(event, type) {
    if (type == 'firstName') {
      // console.log(event.target.value);
      this.afs
        .collection('users')
        .doc(this.authService.userId)
        .set({ displayName: event.target.value }, { merge: true });
      this.authService.presentToast('Your name has been changed');
    } else if (type == 'dob') {
      this.afs
        .collection('users')
        .doc(this.authService.userId)
        .set({ dob: (new Date(event.target.value.toString())).toDateString() }, { merge: true });
      this.authService.presentToast('Your date of birth has been changed');
    } else if (type == 'mobile') {
      this.afs
        .collection('users')
        .doc(this.authService.userId)
        .set({ mobileNumber: event.target.value }, { merge: true });
      this.authService.presentToast('Your mobile number has been changed');
    } else if (type == 'gender') {
      this.afs
        .collection('users')
        .doc(this.authService.userId)
        .set({ gender: event.target.value }, { merge: true });
      this.authService.presentToast('Your gender has been changed');
    } else if (type == 'country') {
      this.afs
        .collection('users')
        .doc(this.authService.userId)
        .set({ country: event.target.value }, { merge: true });
      this.authService.presentToast('Your country has been changed');
    }
  }
  async changeImage(event) {
    this.dataProvider.showOverlay = true;
    const file = event.target.files[0];
    if (event.target.files[0].size < 500000) {
      const filePath = `userAvatarImages/${this.userName}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task
        .snapshotChanges()
        .pipe(
          last(),
          switchMap(() => fileRef.getDownloadURL())
        )
        .subscribe((url) => {
          this.downloadURL = url;
          // console.log('User Download', this.downloadURL);
          this.dataProvider.showOverlay = false;
          // console.log('UserPhoto', this.authService.getUserPhoto());
          if (
            this.authService.getUserPhoto().split('.')[1] != 'googleusercontent'
          ) {
            this.storage.storage
              .refFromURL(this.authService.getUserPhoto())
              .delete();
          }
          this.afs
            .collection('users')
            .doc(this.authService.userId)
            .update({ photoURL: this.downloadURL });
          this.authService.presentToast(
            'Your profile picture has been changed'
          );
        });
    } else {
      this.dataProvider.showOverlay = false;
      this.authService.presentToast(
        'Image size should be less than 500kb'
      );
    }
  }
  ngOnInit() {
    this.dataProvider.showOverlay = false;
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
  }
}
