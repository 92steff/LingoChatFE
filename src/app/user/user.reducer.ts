import { User } from '../models/user.model';
import * as UserActions from './user.actions';

export interface State {
    friends: User[],
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
                openedChats: state.openedChats,
                friends: action.payload
            };
        case UserActions.OPEN_CHAT:
            const updatedChats = [...state.openedChats];
            updatedChats.push(action.payload);
            return {
                friends: state.friends,
                openedChats: updatedChats
            };
        case UserActions.RETRIEVE_CHATS:
            return {
                friends: state.friends,
                openedChats: [...action.payload]
            };
        case UserActions.CLOSE_CHAT:
            const filterdArr = state.openedChats.filter(friend => friend.id !== action.payload);
            return {
                friends: state.friends,
                openedChats: filterdArr
            }
        default: return state;
    }
}