import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() blogimg:string ="https://source.unsplash.com/940x650"
  @Input() blogTitle:string =  "A blog to read"
  @Input() blogDescription:string = "Lorem ipsum dolor sit amet, consectetur\n" +
    "                  adipiscing elit. Curabitur cursus tincidunt\n" +
    "                  commodo. Nunc justo nisi, vestibulum."
  @Input() blogId:string;
  constructor() { }

  ngOnInit(): void {
  }

}
