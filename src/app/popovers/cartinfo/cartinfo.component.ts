import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.scss'],
})
export class CartinfoComponent implements OnInit {
  @Input() products:any;
  constructor(public popoverController: PopoverController) { }
  ngOnInit() {}

}
