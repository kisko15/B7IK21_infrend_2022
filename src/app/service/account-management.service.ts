import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AccountManagement } from '../models/AccountManagement';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  constructor(private http: HttpClient) { }

  async createNewBankAccount(accountManagement: AccountManagement) {
    return lastValueFrom(this.http.post<AccountManagement>('/api/new-bank-account', accountManagement));
  }

  async getBankAccount(id: number) {
    return lastValueFrom(this.http.get<AccountManagement[]>('/api/new-bank-account', {params: {id}}));
  }

  async getAccountManagement() {
    return lastValueFrom(this.http.get<AccountManagement[]>('/api/account-management'));
  }

  async getAllAccountManagementByStatusActive(search: string, bankAccount: string) {
    let params = new HttpParams()
      .set('search', search)
      .set('bankAccount', bankAccount);
    return lastValueFrom(this.http.get<AccountManagement[]>('/api/transfers', { params: params }));
  }
  
  async filterAccountManagement(search: string) {
    return lastValueFrom(this.http.get<AccountManagement[]>('/api/account-management', { params: { search }}));
  }

  async updateAccountManagementSatus(accountManagement: AccountManagement) {
    return lastValueFrom(this.http.put<AccountManagement>('/api/account-management', accountManagement ));
  }

  async updateAccountManagementSatusAll(accountManagement: AccountManagement, bankAccount: string) {
    return lastValueFrom(this.http.put<AccountManagement>('/api/account-management-status-all', accountManagement, { params: { bankAccount }}));
  }

  async getAccountManagementById(id: number) {
    return lastValueFrom(this.http.get<AccountManagement>('/api/account-management/' + id));
  }

  async getTransferAccountManagementById(id: number) {
    return lastValueFrom(this.http.get<AccountManagement>('/api/transfer/' + id));
  }

  async updateBalanceByBankAccount(accountManagement: AccountManagement, balance: number) {
    return lastValueFrom(this.http.put<AccountManagement>('/api/transfer-out', accountManagement, { params: { balance }} ));
  }

  async updateBalanceByBeneficiaryBankAccount(accountManagement: AccountManagement, balance: number) {
    return lastValueFrom(this.http.put<AccountManagement>('/api/transfer-in', accountManagement, { params: { balance } } ));
  }

  async getOneBankAccountByBeneficiaryBankAccount(bankAccount: string) {
    return lastValueFrom(this.http.get<AccountManagement>('/api/transfer', {params: {bankAccount}}));
  }
}
