import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() avatar:string ="";
  @Input() userName:string ="";
  @Input() userEmail:string ="";
  @Input() fullName:string ="";
  @Input() description:string ="";
  textlength:number=150;
  constructor() { }

  ngOnInit() {
    if (this.description.length>=this.textlength){
      this.description = this.description.substring(0,this.textlength) +"...";
    }

  }

}
