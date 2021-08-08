import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
screenwidth=window.innerWidth
  constructor(public afs: AngularFirestore,) { }
  allHandmadeProds=[];
  allDigitalProds=[];
  allRecommendedProds=[];
  allProducts=[];
  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  ngOnInit() {
    AOS.init();
    this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
      this.allHandmadeProds=[];
      value.categories.forEach((element:any) => {
        // console.log(value.categories.indexOf(element),"indexof")
        if (value.categories.indexOf(element)==0){
          // console.log("removing elements");
          this.allHandmadeProds.length=0;
          // console.log(this.allProds.length)
        }
        this.afs.collection('products').doc('Manual Artworks')
        .collection('categories')
        .doc(element.subCategory)
        .collection('products').valueChanges().subscribe((proddata)=>{
          this.allProducts[element.category] = proddata;
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.allHandmadeProds.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0) {
              this.allHandmadeProds.push(product);
            }
          })
        })
      })
      
    });
    this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
      this.allDigitalProds=[];
      value.categories.forEach((element:any) => {
        // console.log(value.categories.indexOf(element),"indexof")
        if (value.categories.indexOf(element)==0){
          // console.log("removing elements");
          this.allDigitalProds.length=0;
          // console.log(this.allProds.length)
        }
        this.afs.collection('products').doc('Digital Artworks')
        .collection('categories')
        .doc(element.subCategory)
        .collection('products').valueChanges().subscribe((proddata)=>{
          this.allProducts[element.category] = proddata;
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.allDigitalProds.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0) {
              this.allDigitalProds.push(product);
            }
          })
        })
      })
    });
    this.afs.collection('data').doc("productData").valueChanges().subscribe((value:any)=>{
      this.allRecommendedProds=[];
      value.categories.forEach((element:any) => {
        // console.log(value.categories.indexOf(element),"indexof")
        if (value.categories.indexOf(element)==0){
          // console.log("removing elements");
          this.allRecommendedProds.length=0;
          // console.log(this.allProds.length)
        }
        this.afs.collection('products').doc(element.category)
        .collection('categories')
        .doc(element.subCategory)
        .collection('products').valueChanges().subscribe((proddata)=>{
          this.allProducts[element.category] = proddata;
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.allRecommendedProds.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0) {
              this.allRecommendedProds.push(product);
            }
          })
        })
      })
      this.allRecommendedProds=this.shuffle(this.allRecommendedProds)
    });
  }
  products=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
  ]

  blogs=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
  ]
categories=[
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
]
  othercategories=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
]
}
