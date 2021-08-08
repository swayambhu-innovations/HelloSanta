import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
screenwidth=window.innerWidth
  constructor() { }

  ngOnInit() {AOS.init();}
  products=[
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

  blogs=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"A blog to read",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
    },
  ]
categories=[
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
  {
    "img":"https://source.unsplash.com/940x650",
    "name":"DigitalArtWork Product",
  },
]
  othercategories=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"Handmade ArtWork Product",
    },
]
}
