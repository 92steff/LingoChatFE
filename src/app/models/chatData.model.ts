import { User } from './user.model';
import { Message } from './message.model';

export class ChatData {
    user: User;
    chatId: string;
    messages: Message[];
}