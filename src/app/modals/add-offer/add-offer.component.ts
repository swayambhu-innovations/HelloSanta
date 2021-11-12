import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss'],
})
export class AddOfferComponent implements OnInit {
  constructor(private formbuilder: FormBuilder,public inventoryService: InventoryService,private modalController: ModalController) {
    this.form = this.formbuilder.group({
      offerName:this.offerName,
      offerType:this.offerType,
      offerCost:this.offerCost,
      offerCode:this.offerCode,
      minimumPrice:this.minimumPrice,
      minimumProducts:this.minimumProducts,
      maximumDiscount:this.maximumDiscount,
    });
  }
  form: FormGroup;
  offerName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  offerType : 'flat' | 'percent' = 'flat'
  usage: 'single' | 'infinite' | number
  offerCost: FormControl = new FormControl('', [Validators.required]);
  offerCode: FormControl = new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]);
  minimumPrice: FormControl = new FormControl('', [Validators.required]);
  minimumProducts: FormControl = new FormControl('', [Validators.required])
  maximumDiscount: FormControl = new FormControl('', [Validators.required]);
  isNumber(val): boolean { return typeof val === 'number'; }
  logValue(dat){
    console.log(dat)
  }
  changeUsage(event){
    this.usage = parseInt(event)
  }
  publishOffer(){
    let data ={
      name: this.form.get('offerName')!.value,
      type: this.offerType,
      cost: this.form.get('offerCost')!.value,
      code: this.form.get('offerCode')!.value,
      minimumPrice: this.form.get('minimumPrice')!.value,
      minimumProducts: this.form.get('minimumProducts')!.value,
      maximumDiscount: this.form.get('maximumDiscount')!.value,
      usage: this.usage,
      usageCounter:0,
    }
    // console.log("Triggered")
    this.inventoryService.addOffer(data);
    // console.log("Confirmed")
    this.modalController.dismiss();
  }
  ngOnInit() {

  }
}
