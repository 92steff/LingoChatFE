import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducers';
import * as UserSelectors from '../store/user.selectors';
import * as AuthSelectors from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userDataForm: FormGroup;
  passChangeForm: FormGroup;
  isEditing: boolean = false;
  isPassEditing: boolean = false;
  isOwnProfile: boolean = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select(UserSelectors.selectUserInfo).pipe(
      take(1),
      map((user: User) => this.user = user)
    ) 
    this.userDataForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.username)
    })
    this.store.select(AuthSelectors.selectUserID).pipe(
      take(1),
      map((uid) => this.isOwnProfile = (uid === this.user.id))
    )
    this.passChangeForm = new FormGroup({
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null),
      reNewPassword: new FormControl(null)
    }, { validators: this.passMatch, updateOn: 'submit' })
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

}
