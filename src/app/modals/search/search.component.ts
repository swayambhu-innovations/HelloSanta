import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { SearchResultComponent } from 'src/app/popovers/search-result/search-result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() keyword: string;
  constructor(private afs: AngularFirestore,public modalController: ModalController) { }
  results:any;
  searchable=false;
  ngOnInit() {}
  search(event){
    this.results=[];
    console.log('Searching',event)
    let keyword = event.detail.value;
    if (/\S/.test(keyword)){
      this.searchable=true;
      this.afs.collection('products').valueChanges().subscribe((prods:any)=>{
        for (let value of prods){
          if (value.productName.toLowerCase().search(keyword)>=0 || value.seoDescription.toLowerCase().search(keyword)>=0){
            if (this.results==undefined){this.results=[]}
            this.results.push({
              text:value.productName,
              href:"./product?productId="+value.productId,
              image:value.productImages[0].image,
              type:'product',
            });
          }
        }
        this.afs.collection('blog').valueChanges().subscribe((blogs:any)=>{
          for (let value of blogs){
            if (value.blogTitle.toLowerCase().search(keyword)>=0 || value.blogExcerpt.toLowerCase().search(keyword)>=0 ){
              if (this.results==undefined){this.results=[]}
              this.results.push({
                text:value.blogTitle,
                href:"./blog?id="+value.blogId,
                image:value.blogImage,
                type:'blog',
              });
            }
          }
        })
        if (this.results==undefined){this.results=[]}
      })
    } else {
      this.searchable=false;
    }
  }
}
