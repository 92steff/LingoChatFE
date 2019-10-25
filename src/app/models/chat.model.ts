import { User } from './user.model';
import { ChatDetail } from './chatDetail.model';

export class Chat {
    chat: ChatDetail;
    participants: User[];
    lastMessage: string;
}