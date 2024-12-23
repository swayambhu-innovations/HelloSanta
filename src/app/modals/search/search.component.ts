import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { SearchResultComponent } from 'src/app/popovers/search-result/search-result.component';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() keyword: string;
  constructor(
    private afs: AngularFirestore,
    public modalController: ModalController
  ) {}
  results: any;
  searchable = false;
  fuse;
  options = {
    shouldSort: true,
    keys: [
      'productCategory',
      'productDescription',
      'text',
      'type',
      'productPrice',
      'productSubcategory',
      'seoDescription',
      'shortDescription',
      'blogExcerpt',
      'blogTitle',
      'blogTags',
    ],
  };
  items: any = [];
  ngOnInit() {
    this.afs
      .collection('products')
      .ref.get()
      .then((prods: any) => {
        if (this.items == undefined) {
          this.items = [];
        }
        prods.forEach((value: any) => {
          value = value.data();
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
              value = value.data();
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
          });
          console.log(this.items);
          this.fuse = new Fuse(this.items, this.options);
      });
  }
  async search(event) {
    this.results = [];
    console.log('Searching',event)
    this.keyword = event.detail.value;
    await this.fuse;
    if (/\S/.test(this.keyword)) {
      this.results = this.fuse.search(this.keyword);
      console.log('Results',this.results);
      this.searchable = true;
    } else {
      this.searchable = false;
    }
  }
}
