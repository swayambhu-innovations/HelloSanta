import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-issues-card',
  templateUrl: './issues-card.component.html',
  styleUrls: ['./issues-card.component.scss'],
})
export class IssuesCardComponent implements OnInit {
  @Input() title:string=""
  @Input() description:string=""
  @Input() image: string=""
  constructor() { }

  ngOnInit() {}

}
