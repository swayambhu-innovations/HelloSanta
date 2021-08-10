import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() img:string =  "https://source.unsplash.com/650x940"
  @Input() categoryTitle:string = "ArtWork Product"
  @Input() category:string;
  @Input() subcategory:string;
  @Input() productId:string
  constructor() { }

  ngOnInit(): void {
  }

}
