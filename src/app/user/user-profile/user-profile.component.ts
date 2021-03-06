import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducers';
import * as UserSelectors from '../store/user.selectors';
import * as AuthSelectors from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})

export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  userDataForm: FormGroup;
  passChangeForm: FormGroup;
  isEditing: boolean = false;
  isPassEditing: boolean = false;
  myId: string;
  subscription: Subscription;
  subscription1: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select(UserSelectors.selectUserInfo).subscribe(
      (user: User) => this.user = user
    );
    
    this.subscription1 = this.store.select(AuthSelectors.selectUserID).subscribe( // hereeeee
      (uid) =>  this.myId = uid
    );

    this.userDataForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.username)
    });
    
    this.passChangeForm = new FormGroup({
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null),
      reNewPassword: new FormControl(null)
    }, { validators: this.passMatch, updateOn: 'submit' });
  }

  changeInfo() {
    console.log('It woooorks!');
  }

  changePassword() {
    
  }

  cancelEdit() {
    this.userDataForm.reset({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.username
    })
    this.isEditing = !this.isEditing;
  }

  cancelPassEdit() {
    this.passChangeForm.reset();
    this.isPassEditing = !this.isPassEditing;
  }

  passMatch(control: FormGroup) {
    if (control.get('newPassword').value === control.get('reNewPassword').value) {
      return null;
    }
    return { 'passDontMatch': true };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
