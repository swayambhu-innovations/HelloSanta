import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  screenwidth = window.innerWidth;
  constructor(public afs: AngularFirestore) {}
  allHandmadeProds = [];
  allDigitalProds = [];
  allRecommendedProds = [];
  allSantasChoiceProds = [];
  allFeaturedProds = [];
  allProducts = [];
  blogs = [];
  recommendedSelection = 0;
  shuffle(array) {
    var currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  ngOnInit() {
    AOS.init();
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata) => {
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.allHandmadeProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              unknown++;
            }
          });
          if (
            unknown == 0 &&
            product.productCategory.includes('Handmade Products') &&
            this.allHandmadeProds.length <= 5
          ) {
            this.allHandmadeProds.push(product);
          }
        });
      });
    this.afs
      .collection('blog')
      .valueChanges()
      .subscribe((blogdata) => {
        this.blogs = [];
        blogdata.forEach((blog: any) => {
          this.blogs.push(blog);
        });
      });
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata) => {
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.allDigitalProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              unknown++;
            }
          });
          if (
            unknown == 0 &&
            product.productCategory.includes('Digital Artworks')
          ) {
            this.allDigitalProds.push(product);
          }
        });
      });
    this.afs
      .doc('/specificSelectedProducts/products')
      .valueChanges()
      .subscribe((value: any) => {
        if (value.featuredProducts) {
          value.featuredProducts.forEach((prod) => {
            this.afs
              .doc(`products/${prod.productId}`)
              .valueChanges()
              .subscribe((product: any) => {
                if (product != undefined) {
                  let unknown = 0;
                  this.allFeaturedProds.forEach((oldProduct: any) => {
                    if (product.productId == oldProduct.productId) {
                      unknown++;
                    }
                  });
                  if (unknown == 0) {
                    this.allFeaturedProds.push(product);
                  }
                }
              });
          });
        }
        if (value.recommendedProducts) {
          value.recommendedProducts.forEach((prod) => {
            this.afs
              .doc(`products/${prod.productId}`)
              .valueChanges()
              .subscribe((product: any) => {
                if (product != undefined) {
                  let unknown = 0;
                  this.allRecommendedProds.forEach((oldProduct: any) => {
                    if (product.productId == oldProduct.productId) {
                      unknown++;
                    }
                  });
                  if (unknown == 0) {
                    this.allRecommendedProds.push(product);
                  }
                }
              });
          });
        }
        if (value.santasChoice) {
          value.santasChoice.forEach((prod) => {
            this.afs
              .doc(`products/${prod.productId}`)
              .valueChanges()
              .subscribe((product: any) => {
                if (product != undefined) {
                  let unknown = 0;
                  this.allSantasChoiceProds.forEach((oldProduct: any) => {
                    if (product.productId == oldProduct.productId) {
                      unknown++;
                    }
                  });
                  if (unknown == 0) {
                    this.allSantasChoiceProds.push(product);
                  }
                }
              });
          });
        }
      });
  }
}
