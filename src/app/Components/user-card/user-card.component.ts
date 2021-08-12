import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserPromotionComponent } from 'src/app/popovers/user-promotion/user-promotion.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() avatar:string ="";
  @Input() userName:string ="";
  @Input() userEmail:string ="";
  @Input() fullName:string ="";
  @Input() description:string ="";
  textlength:number=150;
  constructor(public popoverController: PopoverController) { }
  async presentPopover(ev: any,userid) {
    const popover = await this.popoverController.create({
      component: UserPromotionComponent,
      event: ev,
      translucent: true,
      componentProps:{
        userid:userid
      }
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    if (this.description.length>=this.textlength){
      this.description = this.description.substring(0,this.textlength) +"...";
    }

  }
  sendMsg(){
    alert('You need to disable this user from firebase console.')
  }

}
