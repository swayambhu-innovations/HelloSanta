import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  screenwidth=window.innerWidth
  constructor(private formbuilder: FormBuilder,) {
    this.helpForm = this.formbuilder.group({
      fullName: this.fullName,
      email: this.email,
      subject: this.subject,
      description: this.description,
    })
   }
  helpForm:FormGroup;
  fullName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.pattern('[a-zA-Z ]*'),
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  subject: FormControl = new FormControl('', [
    Validators.required,
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
  ]);
  ngOnInit() {}

}
