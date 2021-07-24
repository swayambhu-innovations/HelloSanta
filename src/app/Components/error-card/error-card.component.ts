import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss'],
})
export class ErrorCardComponent implements OnInit {
  @Input() type: string=""
  @Input() title: string=""
  @Input() description:string=""
  @Input() date:string=""
  @Input() orderID: string=""
  @Input() username: string=""
  constructor() { }
  ngOnInit() {
    if(this.description.length>=200){
      this.description = this.description.substring(0,200)+"...";
    }
  }

}
