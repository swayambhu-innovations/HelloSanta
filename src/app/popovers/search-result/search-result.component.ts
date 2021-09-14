import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  @Input() keyword: string;
  constructor(private afs: AngularFirestore) { }
  results:any;
  ngOnInit() {
    this.afs.collection('products').valueChanges().subscribe((prods:any)=>{
      this.results=[];
      for (let value of prods){
        if (value.productName.toLowerCase().search(this.keyword)>=0 || value.seoDescription.toLowerCase().search(this.keyword)>=0){
          if (this.results==undefined){this.results=[]}
          this.results.push({
            text:value.productName,
            href:"./product?productId="+value.productId,
            image:value.productImages
          });
        }
      }
      this.afs.collection('blog').valueChanges().subscribe((blogs:any)=>{
        for (let value of blogs){
          if (value.blogTitle.toLowerCase().search(this.keyword)>=0 || value.blogExcerpt.toLowerCase().search(this.keyword)>=0 ){
            if (this.results==undefined){this.results=[]}
            this.results.push({
              text:value.blogTitle,
              href:"./blog?id="+value.blogId,
              image:value.blogImage
            });
          }
        }
      })
      if (this.results==undefined){this.results=[]}
    })

  }
}
