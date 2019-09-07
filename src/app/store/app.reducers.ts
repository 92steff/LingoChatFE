import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUser from '../user/user.reducer';

export interface AppState {
    auth: fromAuth.State,
    user: fromUser.State
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    user: fromUser.userReducer
}

