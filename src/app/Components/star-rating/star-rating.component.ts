import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnInit {
  @Input() value:number = 0;
  @Input() totalstars:number = 5;
  @Input() checkedcolor:string = '#ffc107';
  @Input() size:string = '10px'
  @Input() type:string = 'santa'
  @Input() readonly:boolean = false;
  @Output() rate: EventEmitter<any> = new EventEmitter();
  stars: number[] = [];
  constructor() {
    for(let i =1;i<this.totalstars+1;i++){
      this.stars.push(i);
    }
   }
  
  
  countStar(star) {
    this.value = star;
    // console.log('Value of star', star);
    this.rate.emit({newValue:star});
  }
  ngOnInit() {}

}
