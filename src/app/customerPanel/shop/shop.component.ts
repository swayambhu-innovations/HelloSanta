import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/modals/filter-modal/filter-modal.component';
import { SortModalComponent } from 'src/app/modals/sort-modal/sort-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  screenwidth = window.innerWidth;
  category: any;
  subcategory: any;
  modalFilterSelectedCategory: any;
  modalFilterSelectedSubcategory: any;
  modalFilterPrice: any;
  window = window.innerWidth;
  allDigitalProds: any;
  copyArray = [];
  categories = [];
  subcategories = [];
  filters = {};
  reloaded: boolean = false;
  constructor(
    public modalController: ModalController,
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {
  }
  async presentFilter() {
    console.log(this.modalFilterSelectedCategory);
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      componentProps: {
        selectedCategories: this.modalFilterSelectedCategory || [],
        selectedSubcategories: this.modalFilterSelectedSubcategory || [],
        modalFilterPrice: this.modalFilterPrice || [],
      },
    });
    modal.onDidDismiss().then((data: any) => {
      console.log(data.data);
      this.modalFilterSelectedCategory = data.data.category.category;
      this.modalFilterSelectedSubcategory = data.data.category.subcategory;
      this.modalFilterPrice = data.data.prices;
      this.allDigitalProds = [];
      data.data.category.subcategory.forEach((item) => {
        this.copyArray.forEach((item2) => {
          if (item2.productSubcategory.includes(item.detail.value)) {
            let found = false;
            this.allDigitalProds.forEach((item) => {
              if (item.productId == item2.productId) {
                found = true;
              }
            });
            if (!found) {
              this.allDigitalProds.push(item2);
            }
          }
        });
      });
      data.data.category.category.forEach((item) => {
        this.copyArray.forEach((item2) => {
          if (item2.productCategory.includes(item.detail.value)) {
            let found = false;
            this.allDigitalProds.forEach((item) => {
              if (item.productId == item2.productId) {
                found = true;
              }
            });
            if (!found) {
              this.allDigitalProds.push(item2);
            }
          }
        });
      });

      var categorized = JSON.parse(JSON.stringify(this.allDigitalProds));
      console.log('Length on prices', data.data.prices.length);
      if (data.data.prices.length > 0) {
        data.data.prices.forEach((item) => {
          this.copyArray.forEach((item2) => {
            if (item.detail.value == '100-1000') {
              if (item2.productPrice <= 1000 && item2.productPrice >= 100) {
                let found = false;
                this.allDigitalProds.forEach((item) => {
                  if (item.productId == item2.productId) {
                    found = true;
                  }
                });
                if (!found) {
                  this.allDigitalProds.push(item2);
                }
              }
            } else if (item.detail.value == '1000-5000') {
              if (item2.productPrice < 5000 && item2.productPrice > 1000) {
                let found = false;
                this.allDigitalProds.forEach((item) => {
                  if (item.productId == item2.productId) {
                    found = true;
                  }
                });
                if (!found) {
                  this.allDigitalProds.push(item2);
                }
              }
            } else if (item.detail.value == '5000-10000') {
              if (item2.productPrice < 10000 && item2.productPrice > 5000) {
                let found = false;
                this.allDigitalProds.forEach((item) => {
                  if (item.productId == item2.productId) {
                    found = true;
                  }
                });
                if (!found) {
                  this.allDigitalProds.push(item2);
                }
              }
            } else if (item.detail.value == 'Above10000') {
              if (item2.productPrice > 10000) {
                let found = false;
                this.allDigitalProds.forEach((item) => {
                  if (item.productId == item2.productId) {
                    found = true;
                  }
                });
                if (!found) {
                  this.allDigitalProds.push(item2);
                }
              }
            }
          });
        });
      } else {
        if (categorized.length > 0) {
          this.allDigitalProds = categorized;
        } else {
          this.allDigitalProds = this.copyArray;
        }
      }
      this.authService.presentToast('Filters applied');
      console.log('Filter applied');
      // console.log(this.allDigitalProds,this.allDigitalProds.length);
    });
    return await modal.present();
  }
  async presentsort() {
    const modal = await this.modalController.create({
      component: SortModalComponent,
      componentProps: {
        selectedSort: this.modalFilterPrice || [],
      },
    });
    modal.onDidDismiss().then((data: any) => {
      console.log(data.data);
      if (data.data.sortMethod.detail.value == 'LH') {
        console.log('Low TO High');
        this.allDigitalProds.sort((a, b) => {
          return a.productPrice - b.productPrice;
        });
      } else if (data.data.sortMethod.detail.value == 'HL') {
        console.log('High TO Low');
        this.allDigitalProds.sort((a, b) => {
          return b.productPrice - a.productPrice;
        });
      }
      console.log(this.allDigitalProds);
    });
    return await modal.present();
  }
  resetFilter(notify:boolean=true) {
    this.allDigitalProds =[];
    this.filters = {};
    this.reset();
    this.reset();
    if (notify){this.authService.presentToast('Filters reset');}
  }
  reset() {
    // this.allDigitalProds = JSON.parse(JSON.stringify(this.copyArray));
    this.allDigitalProds =[];
    this.copyArray.forEach((item) => {
      let found = false;
      this.allDigitalProds.forEach((item2) => {
        if (item2.productId == item.productId) {
          found = true;
        }
      });
      if (!found) {
        this.allDigitalProds.push(item);
      }
    });
    // this.allDigitalProds = [];
    // this.ngOnInit();
    console.log('LEN', this.allDigitalProds.length);
    this.filters = {};
    console.log(this.copyArray);
    console.log(this.allDigitalProds);
    const el = document.getElementsByTagName('ion-checkbox');
    for (let l = 0; l < el.length; l++) {
      (el[l] as HTMLIonCheckboxElement).checked = false;
    }
  }
  addFilter(val, type) {
    // console.log(val);
    if (this.allDigitalProds.length == 0) {
      this.resetFilter(false);
      return
    }
    if (val.detail.checked) {
      val.detail['type'] = type;
      this.filters[val.detail.value] = val.detail;
    } else {
      delete this.filters[val.detail.value];
    }
    // console.log(this.filters);
    this.allDigitalProds = [];
    // this.copyArray.forEach((item) => {
    //   this.allDigitalProds.push(item);
    // });
    console.log('Filters', this.filters);
    for (let i in this.filters) {
      if (this.filters[i].type == 'subcategory') {
        this.subCategoryChange(i, this.copyArray).forEach((item) => {
          let found = false;
          this.allDigitalProds.forEach((item2) => {
            if (item2.productId == item.productId) {
              found = true;
            }
          });
          if (!found) {
            this.allDigitalProds.push(item);
          }
        });
        console.log('Subcategory', this.allDigitalProds);
      } else if (this.filters[i].type == 'category') {
        this.categoryChange(i, this.copyArray).forEach((item) => {
          let found = false;
          this.allDigitalProds.forEach((item2) => {
            if (item2.productId == item.productId) {
              found = true;
            }
          });
          if (!found) {
            this.allDigitalProds.push(item);
          }
        });
        console.log('Category', this.allDigitalProds);
      }
    }
    for (let i in this.filters) {
      if (this.filters[i].type == 'price') {
        this.priceChange(i, this.copyArray).forEach((item) => {
          let found = false;
          this.allDigitalProds.forEach((item2) => {
            if (item2.productId == item.productId) {
              found = true;
            }
          });
          if (!found) {
            this.allDigitalProds.push(item);
          }
        });
      }
    }
    if (Object.keys(this.filters).length === 0){
      this.resetFilter();
    }
  }
  subCategoryChange(value, array) {
    let tempList = [];
    array.forEach((item) => {
      if (item.productSubcategory.includes(value) == false) {
        tempList.push(item);
      }
    });
    return tempList;
  }
  categoryChange(value, array) {
    let tempList = [];
    array.forEach((item) => {
      if (item.productCategory.includes(value)) {
        tempList.push(item);
      }
    });
    return tempList;
  }
  priceChange(value, array) {
    if (value == '100-1000') {
      let tempList = [];
      for (let i of array) {
        if (i.productPrice >= 100 && i.productPrice <= 1000) {
          tempList.push(i);
        }
      }
      array = tempList;
    } else if (value == '1000-5000') {
      let tempList = [];
      for (let i of array) {
        if (i.productPrice >= 1000 && i.productPrice <= 5000) {
          tempList.push(i);
        }
      }
      array = tempList;
    } else if (value == '5000-10000') {
      let tempList = [];
      for (let i of array) {
        if (i.productPrice >= 5000 && i.productPrice <= 10000) {
          tempList.push(i);
        }
      }
      array = tempList;
    } else if (value == 'Above10000') {
      let tempList = [];
      for (let i of array) {
        if (i.productPrice > 10000) {
          tempList.push(i);
        }
      }
      array = tempList;
    }
    return array;
  }
  ngOnInit() {
    this.afs
      .collection('products')
      .ref
      .get()
      .then((proddata) => {
        proddata.forEach((product: any) => {
          product = product.data();
          if (this.allDigitalProds == undefined) {
            this.allDigitalProds = [];
          }
          this.allDigitalProds.push(product);
          this.copyArray.push(product);
        });
      });
    this.afs
      .collection('data')
      .doc('category')
      .ref.get()
      .then((value: any) => {
        if (value.exists) {
          this.categories = value.data().categories;
          this.subcategories = value.data().subCategories;
        }
      });
  }
}
