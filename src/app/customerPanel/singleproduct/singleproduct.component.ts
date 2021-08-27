import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';

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
    productPrice:number;
    selectedExtraType:string;
    selectedExtraTitle:string;
    recommendationProducts=[];
    extrasData:any={};
    comments:any;
    priceList={};
    displayPrice=0;
  constructor(
    private activatedRoute: ActivatedRoute,
    public afs: AngularFirestore,
    private authService: AuthService,
    private dataProvider: DataProvider,
    private inventoryService: InventoryService,
    private router: Router,
    private analytics: AngularFireAnalytics,
    private formbuilder: FormBuilder,) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.productId = params['productId'];
    });
    this.form=this.formbuilder.group({
      commentTitle:this.commentTitle,
      commentBody:this.commentBody,
    })
  }
  stars:number=0;
  form:FormGroup;
  commentTitle: FormControl = new FormControl('', [Validators.required]);
  commentBody: FormControl = new FormControl('', [Validators.required]);
  genList(value) {
    let randomList = [];
    for (let i = 1; i < value+1; i++) {
        randomList.push(i);
    }
    return randomList;
  }
  buyNow() {
    this.analytics.logEvent('buyNow', {productId: this.productId,productName:this.productData.productName});
    if (Object.keys(this.extrasData).length==this.productData.extraData.length-2){
      alert("Add to cart product price"+this.productPrice.toString());
      this.dataProvider.checkOutdata=[{
        productData:this.productData.productId,
        extrasData:this.extrasData,
        price:this.productPrice,
      }]
      this.router.navigate(['checkout'])
    }else{
      this.authService.presentToast('Please select all the extras options.')
    }
  }
  addToCart() {
    this.analytics.logEvent('addToCart')
    if (Object.keys(this.extrasData).length==this.productData.extraData.length-1){
      let cartItem = {
        productData:this.productData.productId,
        extrasData:this.extrasData,
        price:this.productPrice,
      }
      this.inventoryService.addToCart(cartItem)
      console.log("addToCart");
    } else {
      this.authService.presentToast('Please select all the extras options.')
    }
  }
  round5(x){
    return Math.ceil(x/5)*5;
  }
  calculatePrice(){
    this.productPrice=0;
    for (let i of Object.keys(this.extrasData)){
      let vldCounter= 0;
      this.productData.permutations.forEach((val)=>{
        val.permutations.forEach((perm)=>{
          if (perm.sectionTitle==i && perm.title == this.extrasData[i].title){
            vldCounter++;
          }
        })
        if (vldCounter==this.productData.extraData.length){
          this.productPrice=val.price;
          vldCounter=0;
        }
      })
    }
  }
  updateData(event,relative,sectionTitle){
    console.log(event); 
    this.extrasData[sectionTitle]=event.detail.value;
    let relatives=[];
    if (relative){
      let msgString="";
      this.productData.extraData.forEach((val:any)=>{
        if(val.isRelative==relative){
          val.values.forEach((options)=>{
            relatives.push(options);
          })
        }
      })
      let checked=[]
      relatives.forEach((val)=>{
        console.log("rela",val,sectionTitle)
        if (!relatives.includes(this.extrasData[val.sectionTitle]) && !checked.includes(val.sectionTitle)){
          msgString+=" "+val.sectionTitle+","
          checked.push(val.sectionTitle)
        }
      })
      if (msgString.length>0){
        this.authService.presentToast("You need to select"+msgString+" to get final price");
      }else {
        this.calculatePrice();
      }
    } else {
      this.extrasData[sectionTitle]=event.detail.value;
      this.calculatePrice();
    }
  }
  changeRatingStar($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}){
    this.stars=$event.newValue;
  }
  addComment(){
    this.analytics.logEvent('addComment');
    let today = new Date();
    let commentData = {
      commentTitle: this.form.get('commentTitle').value,
      commentBody: this.form.get('commentBody').value,
      userId:this.authService.userId,
      userName:this.authService.getUserName(),
      userImage:this.authService.getUserPhoto(),
      commentDate:today.toDateString(),
      stars:this.stars,
    }
    console.log(commentData);
    this.inventoryService.addComment(commentData,this.productId);
  }
  ngOnInit() {
    this.afs.collection('products').doc(this.productId).valueChanges().subscribe((value:any)=>{
        console.log(value);
        this.productData=value;
        this.productPrice=value.productPrice;
        this.displayPrice=value.productPrice;
        this.selectedImage=this.productData.productImages[0].image;
        this.selectedExtraType=this.productData.extraData[0].type;
        this.selectedExtraTitle=this.productData.extraData[0].sectionTitle;
        this.category=this.productData.productCategory;
        this.subcategory=this.productData.productSubcategory;
        this.comments=value.comments;
    })
    this.afs
        .collection('products').valueChanges().subscribe((proddata:any)=>{
          proddata.forEach((product:any) => {
            let unknown = 0;
            this.recommendationProducts.forEach((oldProduct:any) => {
              if (product.productId==oldProduct.productId) {
                console.log("already exists");
                unknown++;
              }
            })
            if (unknown==0 && (this.category.some(ct => product.productCategory.includes(ct)) || this.subcategory.some(ct => product.productSubcategory.includes(ct)))) {
              this.recommendationProducts.push(product);
            }
          })
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
