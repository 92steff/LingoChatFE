import * as fromApp from '../store/app.reducers';
import { createSelector } from '@ngrx/store';

export const UserState = (state:fromApp.AppState) => state.user

export const selectUserFriends = createSelector(
    UserState,
    (state) => state.friends
);

export const selectOpenedChats = createSelector(
    UserState,
    (state) => state.openedChats
);
