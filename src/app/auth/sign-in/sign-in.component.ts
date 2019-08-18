import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  signInForm:FormGroup;

  constructor(private fb:FormBuilder) {
    this.signInForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  ngOnInit() {}

}
