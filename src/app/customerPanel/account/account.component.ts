import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor() { }

  ngOnInit() {}
  products=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "price":"2300",
      "date":"22/06/2021",
    },
  ]
}
