import { User } from "./User";

export interface AccountManagement {
    id: number;
    bankAccount: string;
    balance: string;
    bankAccountStatus: string;
    user: User;
}