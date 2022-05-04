import { getRepository } from "typeorm";
import { AccountManagement } from "../entity/AccountManagement";
import { Controller } from "./controller";

export class AccountManagementController extends Controller {
    repository = getRepository(AccountManagement);

    getAll = async (req, res) => {
        const id = req.query.id;
        try {
            const entities = await this.repository
                .createQueryBuilder("accountManagement")
                .leftJoinAndSelect('accountManagement.user','user')
                .where("accountManagement.userId = :id", { id: id })
                .getCount();
                
            res.json(entities);
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };

    getAllAccountManagement = async (req, res) => {
        const search = req.query.search || '';
        try{
           const entities = await this.repository
               .createQueryBuilder('accountManagement')
               .leftJoinAndSelect('accountManagement.user','user')
               .where("user.id LIKE CONCAT('%', :search, '%')",{search:search})
               .orWhere("user.name LIKE CONCAT('%', :search, '%')",{search:search})
               .orWhere("user.identityCardNumber LIKE CONCAT('%', :search, '%')",{search:search})
               .getMany();
           res.json(entities);
           }catch(err){
               console.error(err);
               this.handleError(res);
           }
       };

       getAllAccountManagementByStatusActive = async (req, res) => {
        const search = req.query.search || '';
        const bankAccount = req.query.bankAccount;
        try{
           const entities = await this.repository
               .createQueryBuilder('accountManagement')
               .leftJoinAndSelect('accountManagement.user','user')
               .where("accountManagement.bankAccountStatus LIKE CONCAT('%', :search, '%')",{search:search})
               .andWhere("user.bankAccountStatusAll LIKE CONCAT('%', :search, '%')",{search:search})
               .andWhere("accountManagement.bankAccount NOT LIKE CONCAT('%', :bankAccount, '%')",{bankAccount:bankAccount})
               .getMany();
           res.json(entities);
           }catch(err){
               console.error(err);
               this.handleError(res);
           }
       };

    updateOne = async (req, res) => {
        const id = req.body.id;

        try {
            const accountManagement = await this.repository
                .createQueryBuilder()
                .update<AccountManagement>(AccountManagement, { 
                    bankAccountStatus: "zárolt",
                    balance: 0
                })
                .where("id = :id", { id: id })
                .updateEntity(true)
                .execute();

                res.json(accountManagement);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    updateAccountManagementSatusAll = async (req, res) => {
        const bankAccount = req.query.bankAccount;

        try {
            const accountManagement = await this.repository
                .createQueryBuilder()
                .update(AccountManagement)
                .set({ 
                    bankAccountStatus: "zárolt",
                    balance: 0
                })
                .where("bankAccount LIKE CONCAT( :bankAccount, '%')", { bankAccount: bankAccount })
                .updateEntity(true)
                .execute();

                res.json(accountManagement);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    updateBalanceByBankAccount = async (req, res) => {
        const balance = req.query.balance;
        const id = req.body.id;

        try {
            const accountManagement = await this.repository
                .createQueryBuilder()
                .update(AccountManagement)
                .set({
                    balance: () => 'balance - :balance'
                })
                .setParameter("balance", balance)
                .where("id = :id", { id: id })
                .updateEntity(true)
                .execute();

                res.json(accountManagement);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    updateBalanceByBeneficiaryBankAccount = async (req, res) => {
        const balance = req.query.balance;
        const bankAccount = req.body.bankAccount;

        try {
            const accountManagement = await this.repository
                .createQueryBuilder()
                .update(AccountManagement)
                .set({
                    balance: () => 'balance + :balance'
                })
                .setParameter("balance", balance)
                .where("bankAccount = :bankAccount", { bankAccount: bankAccount })
                .updateEntity(true)
                .execute();

                res.json(accountManagement);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getOneBankAccountByBeneficiaryBankAccount = async (req, res) => {
        const bankAccount = req.query.bankAccount;
        try {
            const entity = await this.repository
                .createQueryBuilder("accountManagement")
                .where("accountManagement.bankAccount = :bankAccount", { bankAccount: bankAccount })
                .getOne();
                
            res.json(entity);
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };
}

