import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found404',
  templateUrl: './not-found404.component.html',
  styleUrls: ['./not-found404.component.scss'],
})
export class NotFound404Component implements OnInit {
  screenwidth = window.innerWidth;
  pageName:string="";
  constructor() { }
  ngOnInit() {
    window.location.href.split("/").forEach(element => {
      if (element != "") {
        this.pageName = element;
      }
    });
  }

}
