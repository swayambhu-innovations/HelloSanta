import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsModalService } from 'src/app/services/alerts-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-customproduct',
  templateUrl: './customproduct.component.html',
  styleUrls: ['./customproduct.component.scss'],
})
export class CustomproductComponent implements OnInit {
  screenwidth = window.innerWidth;
  customProductForm: FormGroup;
  fullName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.email,
  ]);
  phoneNumber: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('[0-9]{10}'),
  ]);
  addressLine1: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  city: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  pincode: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*'),
  ]);
  state: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  country: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  productCategory:FormControl = new FormControl('', [Validators.required,]);
  customProductDescription: FormControl = new FormControl('', [Validators.required,]);
  customPrice: FormControl = new FormControl('', [Validators.required,]);
  async submitProduct(){
    // console.log("submit product")
    let res = await this.alertsModals.presentContinueAlert();
    // console.log(res);
    if (res=='continue'){
      let data = {
        fullName: this.fullName.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        addressLine1: this.addressLine1.value,
        city: this.city.value,
        pincode: this.pincode.value,
        state: this.state.value,
        country: this.country.value,
        customProductDescription: this.customProductDescription.value,
        customPrice: this.customPrice.value,
        productCategory: this.productCategory.value,
      }
      this.inventoryService.addCustomProduct(data);
      this.authService.presentToast("Custom product request added successfully")
    }
  }
  constructor(
    private formbuilder: FormBuilder,
    private inventoryService: InventoryService,
    private alertsModals: AlertsModalService,
    private authService: AuthService,
    ) {
    this.customProductForm = this.formbuilder.group({
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      addressLine1: this.addressLine1,
      city: this.city,
      pincode: this.pincode,
      state: this.state,
      country: this.country,
      customProductDescription: this.customProductDescription,
      customPrice: this.customPrice,
      productCategory: this.productCategory,
    });
   }
  ngOnInit() {}
}
