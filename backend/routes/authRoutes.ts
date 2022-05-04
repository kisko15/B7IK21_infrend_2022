import { Router } from "express";
import { AuthController } from "../src/controller/auth.controller";

export function getAuthRoutes() {
    const router = Router();

    const authController = new AuthController();

    router.post('/register', authController.create);
    router.get('/register', authController.findUsersByEmail);
    router.post('/login', authController.login);

    return router;
}