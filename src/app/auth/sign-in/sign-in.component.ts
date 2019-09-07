import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/services/toast.service';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import * as authSelectors from '../store/auth.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  signInForm:FormGroup;
  error$;

  constructor(private fb:FormBuilder, private store:Store<fromApp.AppState>, private ts:ToastService) {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.error$ = this.store.select(authSelectors.selectAuthError);
  }

  login(form:FormGroup) {
    if (form.valid) {
      this.store.dispatch(new AuthActions.TryLogin(form.value));
    } else {
      this.defineErrMsg(form);
    }
  }

  defineErrMsg(formG:FormGroup) {
    const form = formG.value;
    
    for (let prop in form) {
      if (form[prop] === null || form[prop] === '') {
        return this.ts.add('All fields are required!');
      }
      if (formG.get('email').errors) {
        return this.ts.add('This is not a vaild email!');
      }
    }
  }

}
