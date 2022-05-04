import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AccountHistory } from '../models/AccountHistory';
import { AccountManagement } from '../models/AccountManagement';

@Injectable({
  providedIn: 'root'
})
export class AccountHistoryService {

  constructor(private http: HttpClient) { }

  async createAccountHistoryTransfer(accountHistory: AccountHistory) {
    return lastValueFrom(this.http.post<AccountHistory>('/api/account-history', accountHistory));
  }

  async createAccountHistoryByBlocked(accountManagement: AccountManagement) {
    return lastValueFrom(this.http.post<AccountManagement>('/api/account-history-blocked', accountManagement));
  }

  async getAccountHistory(id: number) {
    return lastValueFrom(this.http.get<AccountHistory[]>('/api/account-history', {params: { id }}));
  }

  async filterAccountHistory(search: string, id: number) {
    let params = new HttpParams()
    .set('search', search)
    .set('id', id);
    return lastValueFrom(this.http.get<AccountHistory[]>('/api/account-history-search', {params: params }));
  }

}
