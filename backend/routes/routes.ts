import { Router } from "express";
import { AccountHistoryController } from "../src/controller/account-history.controller";
import { AccountManagementController } from "../src/controller/account-management.controller";
import { UserController } from "../src/controller/user.controller";

export function getRoutes() {
    const router = Router();

    const userController = new UserController();
    const accountManagementController = new AccountManagementController();
    const accountHistoryController = new AccountHistoryController();

    router.get('/users', userController.getAll);
    router.get('/users/:id', userController.getOne);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.delete);
    router.put('/users-status-all', userController.updateUserBankAccountSatusAll);

    router.put('/new-bank-account', userController.updateOne);

    router.get('/new-bank-account', accountManagementController.getAll);
    router.get('/new-bank-account/:id', accountManagementController.getOne);
    router.post('/new-bank-account', accountManagementController.create);
    router.put('/new-bank-account', accountManagementController.update);
    router.delete('/new-bank-account/:id', accountManagementController.delete);

    router.get('/account-management', accountManagementController.getAllAccountManagement);
    router.put('/account-management', accountManagementController.updateOne);
    router.put('/account-management-status-all', accountManagementController.updateAccountManagementSatusAll);
    router.get('/account-management/:id', accountManagementController.getOne);

    router.get('/account-history', accountHistoryController.getAll);
    router.get('/account-history-search', accountHistoryController.getSearchAll);
    router.post('/account-history', accountHistoryController.create);
    router.post('/account-history-blocked', accountHistoryController.createAccountHistoryByBlocked);
    router.put('/account-history', accountHistoryController.update);
    router.delete('/account-history/:id', accountHistoryController.delete);

    router.get('/transfers', accountManagementController.getAllAccountManagementByStatusActive);
    router.get('/transfer/:id', accountManagementController.getOne);
    router.put('/transfer-out', accountManagementController.updateBalanceByBankAccount);
    router.put('/transfer-in', accountManagementController.updateBalanceByBeneficiaryBankAccount);
    router.get('/transfer', accountManagementController.getOneBankAccountByBeneficiaryBankAccount);

    return router;
}