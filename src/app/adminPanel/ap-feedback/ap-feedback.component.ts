import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MoreInfoComponent } from 'src/app/popovers/more-info/more-info.component';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-ap-feedback',
  templateUrl: './ap-feedback.component.html',
  styleUrls: ['./ap-feedback.component.scss'],
})
export class APFeedbackComponent implements OnInit {

  constructor(private inventoryService: InventoryService,public popoverController: PopoverController) { }
  feedbacks:any;
  websiteFeedbacks:any;
  async showInfo(ev,data,listData?){
    const popover = await this.popoverController.create({
      component: MoreInfoComponent,
      componentProps: {
        data: data,
        listData:listData!=undefined ? Object.keys(listData):undefined,
      },
      event: ev,
      translucent: true
    });
    await popover.present();
  }
  ngOnInit() {
    this.inventoryService.getHelpDocuments().then((data:any) => {
     data.forEach((doc:any) => {
       console.log(doc.id, " => ", doc.data());
       if (this.feedbacks==undefined){this.feedbacks=[]}
       doc.data()['id']=doc.id;
       this.feedbacks.push(doc.data());
     })
    })
    this.inventoryService.getWebsiteFeedbacks().valueChanges().subscribe((data:any) => {
      this.websiteFeedbacks=[]
      data.forEach((doc:any) => {
        this.websiteFeedbacks.push(doc)
      })
    })
  }
}
