import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-user-referral',
  templateUrl: './user-referral.component.html',
  styleUrls: ['./user-referral.component.scss'],
})
export class UserReferralComponent implements OnInit {
  screenwidth = window.innerWidth;
  loading = false;
  form: FormGroup;
  referCode: string;
  isReferrer: boolean;
  userReferral: FormControl = new FormControl('', []);
  constructor(
    private authService: AuthService,
    private inventoryService: InventoryService,
    private afs: AngularFirestore,
    private formbuilder: FormBuilder
  ) {
    this.form = this.formbuilder.group({
      userReferral: this.userReferral,
    });
  }
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', item);
      e.preventDefault();
      document.removeEventListener('copy', null);
      this.authService.presentToast('Copied to clipboard');
    });
    document.execCommand('copy');
  }
  referralState(value) {
    console.log(value, 'value');
    this.authService.presentToast('Changes saved');
    if (value.detail.checked) {
      this.inventoryService.optInreferral();
    } else {
      this.inventoryService.optOutReferral();
    }
  }
  users = [];
  referredIds = [];
  ngOnInit() {
    this.afs
      .collection('users')
      .valueChanges()
      .subscribe((snapshot: any) => {
        this.afs
          .collection('users')
          .doc(this.authService.userId)
          .valueChanges()
          .subscribe((users: any) => {
            this.userReferral.setValue(users.isReferrer);
            this.referredIds = users.referred;
            this.referCode=users.referralCode;
            this.isReferrer=users.isReferrer;
            this.loading = true;
            this.users = snapshot.filter((val) => {
              console.log(val.uid, 'val.id');
              if (this.referredIds.includes(val.uid)) {
                return val;
              }
            });
          });
      });
  }
}
