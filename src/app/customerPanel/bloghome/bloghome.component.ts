import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-bloghome',
  templateUrl: './bloghome.component.html',
  styleUrls: ['./bloghome.component.scss'],
})
export class BloghomeComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(private inventoryService: InventoryService,public afs: AngularFirestore) { }
  blogs=[]
  main:any={};
  ngOnInit() {
    this.afs.collection('blog').ref.get().then((data:any) => {
      this.blogs=[];
      data.forEach((element:any) => {
        if (element.data().mainBlog) {
          this.main.blogImage=element.data().blogImage;
          this.main.blogTitle=element.data().blogTitle;
          this.main.blogContent=element.data().blogContent;
          this.main.blogDate=element.data().blogDate;
          this.main.blogExcerpt=element.data().blogExcerpt;
          this.main.blogId=element.id;
        }
        this.blogs.push(element.data())
      });
    })
  }

}
