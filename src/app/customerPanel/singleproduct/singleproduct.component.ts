import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss'],
})
export class SingleproductComponent implements OnInit {
  screenwidth = window.innerWidth;
    category=[];
    subcategory=[];
    productId:string;
    selectedImage:string;
    productData:any;
    selectedExtraType:string;
    selectedExtraTitle:string;
    recommendationProducts=[];
  constructor(private activatedRoute: ActivatedRoute,public afs: AngularFirestore,) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.productId = params['productId'];
    });
  }
  genList(value){
      let randomList = [];
      for (let i = 1; i < value+1; i++) {
          randomList.push(i);
      }
      return randomList;
  }
  ngOnInit() {
    this.afs.collection('products').doc(this.productId).valueChanges().subscribe((value)=>{
        console.log(value);
        this.productData=value;
        this.selectedImage=this.productData.productImages[0].image;
        this.selectedExtraType=this.productData.extraData[0].type;
        this.selectedExtraTitle=this.productData.extraData[0].title;
        this.category=this.productData.productCategory;
        this.subcategory=this.productData.productSubcategory;
    })
    this.afs
        .collection('products').valueChanges().subscribe((proddata:any)=>{
          proddata.forEach((product:any) => {
            console.log(proddata);
            let unknown = 0;
            this.recommendationProducts.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0 && this.category.some(ct => product.productCategory.includes(ct))) {
              this.recommendationProducts.push(product);
            }
          })
          console.log(this.recommendationProducts);
        })
  }
  products = [
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'ArtWork Product',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
      price: '2300',
    },
  ];
}
