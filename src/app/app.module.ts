import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-list/user-form/user-form.component';
import { BankAccountManagementComponent } from './bank-account-management/bank-account-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserModifyComponent } from './user-list/user-modify/user-modify.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { NewBankAccountComponent } from './user-list/new-bank-account/new-bank-account.component';
import { DepositComponent } from './account-management/deposit/deposit.component';
import { PayoutComponent } from './account-management/payout/payout.component';
import { TransferComponent } from './account-management/transfer/transfer.component';
import { AccountHistoryComponent } from './account-management/account-history/account-history.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    BankAccountManagementComponent,
    UserListComponent,
    UserModifyComponent,
    AccountManagementComponent,
    NewBankAccountComponent,
    DepositComponent,
    PayoutComponent,
    TransferComponent,
    AccountHistoryComponent,
    NavComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: DEFAULT_CURRENCY_CODE, useValue: 'HUF ' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
