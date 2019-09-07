import * as UserActions from './user.actions';
import { User } from '../models/user.model';

export interface State {
    friends: any[],
    openedChats: User[]
}

export const initialState: State = {
    friends: [],
    openedChats: []
}

export function userReducer(state = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        case UserActions.OPEN_CHAT:
            const updatedChats = [...state.openedChats];
            updatedChats.push(action.payload);
            return {
                ...state,
                openedChats: updatedChats
            }
        default: return state;
    }
}