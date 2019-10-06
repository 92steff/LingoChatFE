import { User } from './user.model';

export class DecodedAccessToken {
    issuer: string;
    issuedAT: number;
    expirationAt: number;
    user: User;
}