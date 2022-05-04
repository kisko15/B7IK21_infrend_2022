import { AccountManagement } from "./AccountManagement";

export interface AccountHistory {
    id: number;
    bankAccount: string;
    beneficiaryBankAccount: string;
    transfer: number;
    comment: string;
    description: string;
    date: Date;
    accountManagement: AccountManagement;
}