import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountHistory } from "./AccountHistory";
import { User } from "./User";

@Entity()
export class AccountManagement{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    bankAccount: string;

    @Column({type: 'float'})
    balance: number;

    @Column({type: 'text'})
    bankAccountStatus: string;

    @ManyToOne(() => User, (user) => user.accountManagement, {
        eager: true
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => AccountHistory, (accountHistory) => accountHistory.accountManagement)
    accountHistory: AccountHistory[];
    
}
