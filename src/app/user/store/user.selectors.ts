import { createSelector } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

export const UserState = (state:fromApp.AppState) => state.user

export const selectUserFriends = createSelector(
    UserState,
    (state) => state.friends
);

export const selectOpenedChats = createSelector(
    UserState,
    (state) => state.openedChats
);

export const selectSentRequest = createSelector(
    UserState,
    (state) => state.sentRequests
);

export const selectReceivedRequest = createSelector(
    UserState,
    (state) => state.receivedRequests
);

export const selectUserState = createSelector(
    UserState,
    (state) => state
)