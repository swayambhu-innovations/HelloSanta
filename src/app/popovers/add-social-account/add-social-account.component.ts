import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-add-social-account',
  templateUrl: './add-social-account.component.html',
  styleUrls: ['./add-social-account.component.scss'],
})
export class AddSocialAccountComponent implements OnInit {
  @Input() userId:any;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  form:FormGroup;
  type:FormControl = new FormControl('',[Validators.required]);
  socialMediaLink:FormControl = new FormControl('',[Validators.required, Validators.pattern(this.urlRegex)]);
  
  constructor(private formbuilder: FormBuilder,private popoverController: PopoverController,private inventoryService: InventoryService) { 
    this.form  = this.formbuilder.group({
      type: this.type,
      cssClass: 'addSocialMediaLinks',
      socialMediaLink: this.socialMediaLink,
    })
  }
  addSocialMediaLink(){
    let data = {
      type: this.type.value,
      url: this.socialMediaLink.value,
    }
    // console.log(data);
    this.inventoryService.addSocialMediaLink(data);
    this.popoverController.dismiss();
  }
  ngOnInit() {}

}
