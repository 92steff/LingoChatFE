import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as authSelectors from '../store/auth.selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  error$;

  constructor(private fb: FormBuilder, private store: Store<fromStore.AppState>) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
    }, { validators: this.passMatch, updateOn: 'submit' });
  }

  ngOnInit() {
    this.error$ = this.store.select(authSelectors.selectAuthError);
  }

  submitForm(signUpForm: FormGroup) {
    this.store.dispatch(new AuthActions.TrySignup(signUpForm.value));
  }

  passMatch(control: FormGroup) {
    if (control.get('password').value === control.get('rePassword').value) {
      return null;
    }
    return { 'passDontMatch': true };
  }

}
