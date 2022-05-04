import { getRepository } from "typeorm";
import { AccountHistory } from "../entity/AccountHistory";
import { Controller } from "./controller";

export class AccountHistoryController extends Controller{
    repository = getRepository(AccountHistory);

    createAccountHistoryByBlocked = async (req, res) => {
        const body = req.body;

        try {
            const accountHistory = await this.repository
                .createQueryBuilder()
                .insert()
                .into(AccountHistory)
                .values({ 
                    bankAccount: body.bankAccount,
                    beneficiaryBankAccount: '',
                    comment: 'Zárolás és kifizetés',
                    description: '',
                    transfer: body.balance,
                    accountManagement: body.id
                })
                .execute()

                res.json(accountHistory);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getAll = async (req, res) => {
        const id = req.query.id;
     try{
        const entities = await this.repository
            .createQueryBuilder('accountHistory')
            .where("accountHistory.accountManagementId = :id", { id: id })
            .getMany();
        res.json(entities);
        }catch(err){
            console.error(err);
            this.handleError(res);
        }
    };

    getSearchAll = async (req, res) => {
        const search = req.query.search || '';
        const id = req.query.id;
        
     try{
        const entities = await this.repository
            .createQueryBuilder('accountHistory')
            .where("accountHistory.accountManagementId = :id AND accountHistory.transfer LIKE CONCAT('%', :search, '%')", { id: id, search:search })
            .orWhere("accountHistory.accountManagementId = :id AND accountHistory.date LIKE CONCAT('%', :search, '%')", { id: id, search:search})
            .getMany();
        res.json(entities);
        }catch(err){
            console.error(err);
            this.handleError(res);
        }
    };
}