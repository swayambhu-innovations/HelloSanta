import { Component, OnInit } from '@angular/core';
import { AddBlogComponent } from 'src/app/modals/add-blog/add-blog.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-ap-blog',
  templateUrl: './ap-blog.component.html',
  styleUrls: ['./ap-blog.component.scss'],
})
export class APBLogComponent implements OnInit {

  constructor(public modalController: ModalController) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddBlogComponent,
    });
    return await modal.present();
  }
  ngOnInit() {}

}
