import { User } from './user.model';

export class Chat {
    chat: {
        id: string;
        name: string;
        createdAt: number;
    };
    participants: User[];
    lastMessage: string;
}