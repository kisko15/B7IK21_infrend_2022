
import {Entity, Column, BeforeInsert, PrimaryColumn, OneToMany} from "typeorm";
import { AccountManagement } from "./AccountManagement";

@Entity()
export class User {

    @PrimaryColumn("uuid")
    id: number;

    @Column({nullable: true, type: 'text'})
    name: string;

    @Column({nullable: true, type: 'text'})
    address: string;

    @Column({nullable: true, type: 'text'})
    phoneNumber: string;

    @Column({nullable: true, type: 'text'})
    identityCardNumber: string;

    @Column({nullable: true, type: 'text'})
    status: string;

    @Column({type: 'text'})
    bankAccountStatusAll: string;

    @OneToMany(() => AccountManagement, (accountManagement) => accountManagement.user)
    accountManagement: AccountManagement[];
    
    @BeforeInsert()
    addId() {
        this.id = Number('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 10 | 0, v = c == 'x' ? r : (r);
            return v.toString(10);
         }).slice(0, 6));
    }

}

