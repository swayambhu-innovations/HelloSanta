import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ap-complains',
  templateUrl: './ap-complains.component.html',
  styleUrls: ['./ap-complains.component.scss'],
})
export class APComplainsComponent implements OnInit {
  complains=[
    {
      "type":"warning",
      "title":"Order failed after payment.",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "date":"16-12-2021",
      "orderID":"WER897G9D879234903",
      "username":"@quickjellyfish"
    },
    {
      "type":"warning",
      "title":"Order failed after payment.",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "date":"16-12-2021",
      "orderID":"WER897G9D879234903",
      "username":"@quickjellyfish"
    },
    {
      "type":"danger",
      "title":"Order failed after payment.",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "date":"16-12-2021",
      "orderID":"WER897G9D879234903",
      "username":"@quickjellyfish"
    },
    {
      "type":"info",
      "title":"Order failed after payment.",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "date":"16-12-2021",
      "orderID":"WER897G9D879234903",
      "username":"@quickjellyfish"
    },
    {
      "type":"info",
      "title":"Order failed after payment.",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "date":"16-12-2021",
      "orderID":"WER897G9D879234903",
      "username":"@quickjellyfish"
    },
    {
      "type":"warning",
      "title":"Order failed after payment.",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. ",
      "date":"16-12-2021",
      "orderID":"WER897G9D879234903",
      "username":"@quickjellyfish"
    },
  ];
  constructor() { }

  ngOnInit() {}

}
