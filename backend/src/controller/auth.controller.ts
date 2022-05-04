
import { getRepository } from "typeorm";
import { LoginUsers } from "../entity/LoginUsers";
import { Controller } from "./controller";

export class AuthController extends Controller{
    repository = getRepository(LoginUsers);
 
    login = async (req, res) => {
        const { email, password } = req.body;

        if(!(email && password)) {
            res.status(400).send();
        }

        const user = await this.repository.findOne({email: email});

        try {
           if(user && !user.isValidPassword(password)) {
            res.status(401).send("Incorrect password!");
            return ;
           }

            res.status(200).json({ access_token: user.generateJWT() });
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };

    findUsersByEmail = async (req, res) => {
        const email = req.query.email;
        try {
            const entity = await this.repository
                .createQueryBuilder("loginUsers")
                .where("loginUsers.email = :email", { email: email })
                .getCount();
                
            res.json(entity);
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };

}