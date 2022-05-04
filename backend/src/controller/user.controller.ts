import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";

export class UserController extends Controller{
    repository = getRepository(User);

    getAll = async (req, res) => {
        const search = req.query.search || '';
     try{
        const entities = await this.repository
            .createQueryBuilder('user')
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

    updateOne = async (req, res) => {
        const id = req.body.id;

        try {
            const user = await this.repository
                .createQueryBuilder("user")
                .update<User>(User, { bankAccountStatusAll: "aktív" })
                .where("user.id = :id", { id: id })
                .updateEntity(true)
                .execute();

                res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    updateUserBankAccountSatusAll = async (req, res) => {
        const id = req.body.id;

        try {
            const user = await this.repository
                .createQueryBuilder("user")
                .update<User>(User, { bankAccountStatusAll: "zárolt" })
                .where("user.id = :id", { id: id })
                .updateEntity(true)
                .execute();

                res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}