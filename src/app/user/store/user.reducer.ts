import { User } from '../../models/user.model';
import { Chat } from 'src/app/models/chat.model';
import { ChatData } from 'src/app/models/chatData.model';
import * as UserActions from './user.actions';

export interface State {
    friends: User[],
    chats: Chat[],
    openedChats: ChatData[],
    sentRequests: string[],
    receivedRequests: User[],
    userProfileInfo: User | null
}

export const initialState: State = {
    friends: [],
    chats: [],
    openedChats: [],
    sentRequests: [],
    receivedRequests: [],
    userProfileInfo: null
}

export function userReducer(state = initialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.SET_USER_INFO:
            return {
                ...state,
                userProfileInfo: action.payload
            };
        case UserActions.SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            };
        case UserActions.SET_FRIEND_REQUESTS:
            return {
                ...state,
                receivedRequests: action.payload
            };
        case UserActions.REMOVE_FRIEND_REQUEST:
            const updatedReceivedRequests = state.receivedRequests.filter(user => user.id !== action.payload);
            return {
                ...state,
                receivedRequests: updatedReceivedRequests
            };
        case UserActions.UPDATE_SENT_REQUESTS:
            const updatedSentRequests = [...state.sentRequests];
            if (Array.isArray(action.payload)) {
                updatedSentRequests.push(...action.payload);
            } else {
                updatedSentRequests.push(action.payload);
            }
            return {
                ...state,
                sentRequests: updatedSentRequests
            };
        case UserActions.UPDATE_FRIENDS:
            const updatedFriends = [...state.friends];
            updatedFriends.push(action.payload);
            return {
                ...state,
                friends: updatedFriends
            };
        case UserActions.SET_CHATS:
            return {
                ...state,
                chats: action.payload
            };
        case UserActions.OPEN_CHAT:
            const updatedChats = [...state.openedChats];
            updatedChats.push(action.payload);
            return {
                ...state,
                openedChats: updatedChats
            };
        case UserActions.RETRIEVE_CHATS:
            return {
                ...state,
                openedChats: [...action.payload]
            };
        case UserActions.CLOSE_CHAT:
            const filterdArr = state.openedChats.filter(chat => chat.user.id !== action.payload);
            return {
                ...state,
                openedChats: filterdArr
            };
        case UserActions.UPDATE_MESSAGES:
            const chatToUpdate = state.openedChats.find(chat => chat.chatId === action.payload.chatId);
            chatToUpdate.messages.push(action.payload.message);
            const updatedOpenChats = [...state.openedChats];
            for (let i=0; i < updatedOpenChats.length; i++) {
                if (updatedOpenChats[i].chatId === chatToUpdate.chatId) {
                    updatedOpenChats[i] = chatToUpdate;
                }
            }
            return {
                ...state,
                openedChats: updatedOpenChats
            };
        case UserActions.CLEAR_STATE:
            return {
                friends: [],
                chats: [],
                openedChats: [],
                sentRequests: [],
                receivedRequests: [],
                userProfileInfo: null
            };
        default: return state;
    }
}