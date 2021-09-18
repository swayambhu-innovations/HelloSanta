import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  constructor(private formbuilder: FormBuilder,public inventoryService: InventoryService) {
    this.form = this.formbuilder.group({
      offerName:this.offerName,
      offerType:this.offerType,
      offerCost:this.offerCost,
      offerCode:this.offerCode,
      minimumPrice:this.minimumPrice,
      minimumProducts:this.minimumProducts,
    });
  }
  form: FormGroup;
  offerName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  offerType: FormControl = new FormControl('', [Validators.required]);
  offerCost: FormControl = new FormControl('', [Validators.required]);
  offerCode: FormControl = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]);
  minimumPrice: FormControl = new FormControl('', [Validators.required]);
  minimumProducts: FormControl = new FormControl('', [Validators.required])
  publishOffer(){
    let data ={
      name: this.form.get('offerName')!.value,
      type: this.form.get('offerType')!.value,
      cost: this.form.get('offerCost')!.value,
      code: this.form.get('offerCode')!.value,
      minimumPrice: this.form.get('minimumPrice')!.value,
      minimumProducts: this.form.get('minimumProducts')!.value,
    }
    // console.log("Triggered")
    this.inventoryService.addOffer(data);
    // console.log("Confirmed")
  }
  ngOnInit() {}
}
