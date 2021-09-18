import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-specific-products',
  templateUrl: './specific-products.component.html',
  styleUrls: ['./specific-products.component.scss'],
})
export class SpecificProductsComponent implements OnInit {
  @Input() productId:string
  constructor(private inventoryService: InventoryService,public authService:AuthService) { }
  addToRecommendations(){
    let data = {
      productId: this.productId,
    }
    this.inventoryService.addToRecommendations(data);
    this.authService.presentToast("Added to the recommendation list");
  }
  addToFeatured(){
    let data = {
      productId: this.productId,
    }
    this.inventoryService.addToFeaturedProducts(data);
    this.authService.presentToast("Added to the featured list");
  }
  addToSantasChoice(){
    let data = {
      productId: this.productId,
    }
    // console.log(data);
    this.inventoryService.addToSantasChoice(data);
    this.authService.presentToast("Added to the santas choice");
  }
  ngOnInit() {}

}
