import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;

  constructor(private fb:FormBuilder) {
    this.signUpForm = this.fb.group({
      email: '',
      username: '',
      password: '',
      rePassword: ''
    });
   }

  ngOnInit() {
  }

}
