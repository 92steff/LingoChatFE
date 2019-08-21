import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as authSelectors from '../store/auth.selectors';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  error$;

  constructor(private fb: FormBuilder, private store: Store<fromStore.AppState>, private ts:ToastService) {
    this.signUpForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rePassword: [null, Validators.required]
    }, { validators: this.passMatch, updateOn: 'submit' });
  }

  ngOnInit() {
    this.error$ = this.store.select(authSelectors.selectAuthError);
  }

  defineErrMsg(formG:FormGroup) {
    const form = formG.value;
    for (let prop in form) {
      if (form[prop] === null || form[prop] === '') {
        this.ts.add('All fields are required!');
        return;
      }
      if (this.passMatch(formG)) {
        this.ts.add('Passwords don\'t match!');
        return;
      }
      if (formG.get('email').errors['email']) {
        this.ts.add('This is not a vaild email!');
        return;
      }
    }
  }

  submitForm(signUpForm: FormGroup) {
    if (signUpForm.valid) {
      this.store.dispatch(new AuthActions.TrySignup(signUpForm.value));
      this.signUpForm.reset();
    } else {
      this.defineErrMsg(signUpForm);
    }
  }

  passMatch(control: FormGroup) {
    if (control.get('password').value === control.get('rePassword').value) {
      return null;
    }
    return { 'passDontMatch': true };
  }

}
