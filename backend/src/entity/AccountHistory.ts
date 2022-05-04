import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountManagement } from "./AccountManagement";

@Entity()
export class AccountHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    bankAccount: string;

    @Column({ type: 'text'})
    beneficiaryBankAccount: string;

    @Column({ type: 'integer'})
    transfer: number;

    @Column({ type: 'varchar', length: "100", nullable: true})
    description: string;

    @Column({ type: 'varchar', length: "100"})
    comment: string;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => AccountManagement, (accountManagement) => accountManagement.accountHistory, {
        eager: true
    })
    @JoinColumn()
    accountManagement: AccountManagement;

}