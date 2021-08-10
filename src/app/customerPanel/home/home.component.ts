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
        console.log('products data digital', proddata);
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.allHandmadeProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (unknown == 0 && product.productCategory.includes('Handmade Products')) {
            this.allHandmadeProds.push(product);
          }
        });
      });
    this.afs
      .collection('products')
      .valueChanges()
      .subscribe((proddata) => {
        console.log('products data digital', proddata);
        proddata.forEach((product: any) => {
          let unknown = 0;
          this.allDigitalProds.forEach((oldProduct: any) => {
            if (product.productId == oldProduct.productId) {
              console.log('already exists');
              unknown++;
            }
          });
          if (unknown == 0 && product.productCategory.includes('Digital Products')) {
            this.allDigitalProds.push(product);
          }
        });
      });
    this.afs
      .doc('/specificSelectedProducts/products')
      .valueChanges()
      .subscribe((value: any) => {
        value.featuredProducts.forEach((prod) => {
          console.log('prod', prod);
          this.afs
            .doc(`products/${prod.productId}`)
            .valueChanges()
            .subscribe((product: any) => {
              console.log('featured', product);
              let unknown = 0;
              this.allFeaturedProds.forEach((oldProduct: any) => {
                if (product.productId == oldProduct.productId) {
                  console.log('already exists');
                  unknown++;
                }
              });
              if (unknown == 0) {
                this.allFeaturedProds.push(product);
              }
            });
        });
        value.recommendedProducts.forEach((prod) => {
          console.log('prod', prod);
          this.afs
            .doc(`products/${prod.productId}`)
            .valueChanges()
            .subscribe((product: any) => {
              console.log('featured', product);
              let unknown = 0;
              this.allRecommendedProds.forEach((oldProduct: any) => {
                if (product.productId == oldProduct.productId) {
                  console.log('already exists');
                  unknown++;
                }
              });
              if (unknown == 0) {
                this.allRecommendedProds.push(product);
              }
            });
        });
        value.santasChoice.forEach((prod) => {
          console.log('prod', prod);
          this.afs
            .doc(`products/${prod.productId}`)
            .valueChanges()
            .subscribe((product: any) => {
              console.log('featured', product);
              let unknown = 0;
              this.allSantasChoiceProds.forEach((oldProduct: any) => {
                if (product.productId == oldProduct.productId) {
                  console.log('already exists');
                  unknown++;
                }
              });
              if (unknown == 0) {
                this.allSantasChoiceProds.push(product);
              }
            });
        });
      });
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

  blogs = [
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'A blog to read',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'A blog to read',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'A blog to read',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'A blog to read',
      description:
        'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.',
    },
  ];
  categories = [
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'DigitalArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'DigitalArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'DigitalArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'DigitalArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'DigitalArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'DigitalArtWork Product',
    },
  ];
  othercategories = [
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'Handmade ArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'Handmade ArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'Handmade ArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'Handmade ArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'Handmade ArtWork Product',
    },
    {
      img: 'https://source.unsplash.com/940x650',
      name: 'Handmade ArtWork Product',
    },
  ];
}
