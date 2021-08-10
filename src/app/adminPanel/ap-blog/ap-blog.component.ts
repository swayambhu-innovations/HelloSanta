import { Component, OnInit } from '@angular/core';
import { AddBlogComponent } from 'src/app/modals/add-blog/add-blog.component';
import { ModalController } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EditBlogComponent } from 'src/app/modals/edit-blog/edit-blog.component';
@Component({
  selector: 'app-ap-blog',
  templateUrl: './ap-blog.component.html',
  styleUrls: ['./ap-blog.component.scss'],
})
export class APBLogComponent implements OnInit {
  blogs=[];
  constructor(public afs: AngularFirestore,public modalController: ModalController,public inventoryService: InventoryService) { }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddBlogComponent,
    });
    return await modal.present();
  }
  async editBlog(blogId) {
    const modal = await this.modalController.create({
      component: EditBlogComponent,
      componentProps: {
        blogId: blogId,
      }
    });
    return await modal.present();
  }
  deleteBlog(blogId){
    this.inventoryService.deletBlog(blogId);
  }
  publishBlog(blogId){
    this.inventoryService.publishBlog(blogId);
  }
  ngOnInit() {
    this.afs.collection('blog').valueChanges().subscribe((value:any)=>{
      this.blogs=value;
    })
  }

}
