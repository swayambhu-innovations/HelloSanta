import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-order-info',
  templateUrl: './show-order-info.component.html',
  styleUrls: ['./show-order-info.component.scss'],
})
export class ShowOrderInfoComponent implements OnInit {
  @Input() order:any;
  constructor() { }
  genData(dt):any{
    let ordereredPair=[];
    // console.log('dt',dt)
    for (let i of Object.keys(dt)){
      if (dt[i].type=='textSel'){
        ordereredPair.push({title:dt[i].sectionTitle,value:dt[i].title});
      } else if (dt[i].type=='faceCount'){
        ordereredPair.push({title:'No. Of Faces',value:dt[i].faces});
      } else if (dt[i].type=='imgSel'){
        ordereredPair.push({title:dt[i].sectionTitle,value:dt[i].title});
      } else if (dt[i].type=='quantitySel'){
        ordereredPair.push({title:dt[i].sectionTitle,value:dt[i].quantity});
      }
    }
    return ordereredPair;
  }
  ngOnInit() {
    // console.log('orderdata',this.order)
  }

}
