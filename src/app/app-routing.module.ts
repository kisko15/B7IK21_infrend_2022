import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHistoryComponent } from './account-management/account-history/account-history.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { DepositComponent } from './account-management/deposit/deposit.component';
import { PayoutComponent } from './account-management/payout/payout.component';
import { TransferComponent } from './account-management/transfer/transfer.component';
import { BankAccountManagementComponent } from './bank-account-management/bank-account-management.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { NewBankAccountComponent } from './user-list/new-bank-account/new-bank-account.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserModifyComponent } from './user-list/user-modify/user-modify.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: BankAccountManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-form',
    component: UserFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-modify',
    component: UserModifyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-management',
    component: AccountManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-bank-account',
    component: NewBankAccountComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account-history',
    component: AccountHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payout',
    component: PayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
