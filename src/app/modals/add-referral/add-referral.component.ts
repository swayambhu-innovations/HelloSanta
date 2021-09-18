import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-referral',
  templateUrl: './add-referral.component.html',
  styleUrls: ['./add-referral.component.scss'],
})
export class AddReferralComponent implements OnInit {
  constructor(private formbuilder: FormBuilder,public inventoryService: InventoryService,private afs: AngularFirestore) {
    this.form = this.formbuilder.group({
      referralId:this.referralId,
      newUserPoints:this.newUserPoints,
      oldUserPoints: this.oldUserPoints,
      vendor: this.vendor,
    });
  }
  vendors=[]
  form: FormGroup;
  referralId: FormControl = new FormControl('', [Validators.required]);
  newUserPoints: FormControl = new FormControl(0, [Validators.required]);
  oldUserPoints: FormControl = new FormControl(0, [Validators.required]);
  vendor: FormControl = new FormControl('', [Validators.required]);
  publishReferral(){
    let data ={
      referralId: this.form.get('referralId')!.value,
      newUSerPoint: this.form.get('newUserPoints')!.value,
      oldUserPoint: this.form.get('oldUserPoints')!.value,
    }
    // console.log("Triggered")
    this.inventoryService.addReferral(data,this.form.get('vendor')!.value,);
    // console.log("Confirmed")
  }
  ngOnInit() {
    this.afs.collection('users').valueChanges().subscribe((users:any) => {
      this.vendors=[]
      users.forEach(element => {
        if (element.access.accessLevel=='Vendor'){
          this.vendors.push({name:element.displayName,id:element.uid,photo:element.photoURL})
        }
      });
    })
  }

}
