import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() image:string="";
  @Input() title:string="";
  @Input() body:string ="";
  @Input() username:string = "";
  @Input() commentDate:string="";
  @Input() stars:number=0;
  constructor() { }

  ngOnInit() {}

}
