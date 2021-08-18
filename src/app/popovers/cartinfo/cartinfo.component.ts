import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.scss'],
})
export class CartinfoComponent implements OnInit {
  @Input() products:any;
  constructor() { }
  ngOnInit() {}

}
