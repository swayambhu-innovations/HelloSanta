import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor() { }

  ngOnInit() {}
  orders=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
  ]
}
