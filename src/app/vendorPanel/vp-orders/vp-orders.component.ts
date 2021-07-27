import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vp-orders',
  templateUrl: './vp-orders.component.html',
  styleUrls: ['./vp-orders.component.scss'],
})
export class VPOrdersComponent implements OnInit {
  orders=[
    {
      "price":"2500",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "purchaseDate":"02/03/2021",
      "deliveryDate":"18/03/2021",
      "items": [
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
      ]
    },
    {
      "price":"2500",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "purchaseDate":"02/03/2021",
      "deliveryDate":"18/03/2021",
      "items": [
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
      ]
    },
    {
      "price":"2500",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "purchaseDate":"02/03/2021",
      "deliveryDate":"18/03/2021",
      "items": [
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
      ]
    },
    {
      "price":"2500",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "purchaseDate":"02/03/2021",
      "deliveryDate":"18/03/2021",
      "items": [
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
        {
          "name":"Complete Painting",
          "price":"2500",
          "quantity":"2",
          "size":"A-4 Document"
        },
      ]
    },
    
  ]
  constructor() { }

  ngOnInit() {}

}
