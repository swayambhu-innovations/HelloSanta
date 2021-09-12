import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  screenwidth = window.innerWidth;
  @Input() blogimg:string;
  @Input() blogdate:string;
  @Input() blogtitle:string;
  @Input() blogcontent:string;
  blogId:string;
  constructor(private activatedRoute: ActivatedRoute,public afs: AngularFirestore,) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.blogId = params['id'];
    });
  }

  ngOnInit() {
    console.log("blogiD",this.blogId)
    this.afs.collection('blog').doc(this.blogId).valueChanges().subscribe((doc:any) => {
      this.blogimg = doc.blogImage;
      this.blogdate = doc.blogDate;
      this.blogtitle = doc.blogTitle;
      this.blogcontent = doc.blogContent;
    })
  }

}
