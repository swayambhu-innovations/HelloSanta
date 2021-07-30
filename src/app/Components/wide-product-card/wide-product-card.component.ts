import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wide-product-card',
  templateUrl: './wide-product-card.component.html',
  styleUrls: ['./wide-product-card.component.css']
})
export class WideProductCardComponent implements OnInit {
  @Input() img:string =  "https://source.unsplash.com/650x940"
  @Input() orderTitle:string = "ArtWork Product"
  @Input() orderDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum."
  @Input() orderprice:string = "2300"
  constructor() { }

  ngOnInit(): void {
  }

}
