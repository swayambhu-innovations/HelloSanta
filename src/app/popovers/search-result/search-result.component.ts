import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @Input() keyword: string;
  constructor(private afs: AngularFirestore) {}
  results: any;
  items: any;
  ngOnInit() {
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: [
        'productCategory',
        'productDescription',
        'text',
        'productPrice',
        'productSubcategory',
        'seoDescription',
        'shortDescription',
        "blogExcerpt",
        "blogTitle",
        "blogTags",
      ],
    };
    // this.afs.collection('products').valueChanges().subscribe((prods:any)=>{
    //   this.results=[];
    //   for (let value of prods){
    //     if (value.productName.toLowerCase().search(this.keyword.toLowerCase())>=0 || value.seoDescription.toLowerCase().search(this.keyword.toLowerCase())>=0 || value.productCategory.includes(this.keyword) || value.shortDescription.toLowerCase().search(this.keyword.toLowerCase())>=0 || value.productDescription.toLowerCase().search(this.keyword.toLowerCase())>=0){
    //       if (this.results==undefined){this.results=[]}
    //       this.results.push({
    //         text:value.productName,
    //         href:"./product?productId="+value.productId,
    //         image:value.productImages,
    //         type:"Product"
    //       });
    //     }
    //   }
    //   this.afs.collection('blog').valueChanges().subscribe((blogs:any)=>{
    //     for (let value of blogs){
    //       if (value.blogTitle.toLowerCase().search(this.keyword)>=0 || value.blogExcerpt.toLowerCase().search(this.keyword)>=0 ){
    //         if (this.results==undefined){this.results=[]}
    //         this.results.push({
    //           text:value.blogTitle,
    //           href:"./blog?id="+value.blogId,
    //           image:value.blogImage,
    //           type:"Blog Post"
    //         });
    //       }
    //     }
    //   })
    //   if (this.results==undefined){this.results=[]}
    // })
    this.afs
      .collection('products')
      .ref.get()
      .then((prods: any) => {
        if (this.items == undefined) {
          this.items = [];
        }
        prods.forEach((value: any) => {
          value=value.data();
          let data = {
            text: value.productName,
            href: './product?productId=' + value.productId,
            image: value.productImages,
            type: 'Product',
            productCategory: value.productCategory,
            productSubcategory: value.productSubcategory,
            productPrice: value.productPrice,
            productDescription: value.productDescription,
            seoDescription: value.seoDescription,
            shortDescription: value.shortDescription,
          };
          this.items.push(data);
        });
        this.afs
          .collection('blog')
          .ref.get()
          .then((blogs: any) => {
            blogs.forEach((value: any) => {
              value=value.data();
              let data = {
                text: value.blogTitle,
                href: './blog?id=' + value.blogId,
                blogImage: value.blogImage,
                type: 'Blog Post',
                blogTags: value.blogTags,
                blogExcerpt: value.blogExcerpt,
              };
              this.items.push(data);
            });
            console.log(this.items);
            const fuse = new Fuse(this.items, options);
            this.results = fuse.search(this.keyword);
            console.log(this.results);
          });
      });
  }
}
