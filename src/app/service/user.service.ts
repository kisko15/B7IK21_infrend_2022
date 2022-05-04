import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getUsers() {
    return lastValueFrom(this.http.get<User[]>('/api/users'));
  }

  async createUsers(user: User) {
    return lastValueFrom(this.http.post<User>('/api/users', user));
  }

  async updateUsers(user: User) {
    return lastValueFrom(this.http.put<User>('/api/users', user));
  }

  async deleteUsers(id: string) {
    return lastValueFrom(this.http.delete<User>('/api/users/' + id));
  }

  async filterUser(search: string) {
    return lastValueFrom(this.http.get<User[]>('/api/users', { params: { search }}));
  }

  async getUsersById(id: number) {
    return lastValueFrom(this.http.get<User>('/api/users/' + id));
  }

  async updateUserAccountManagementSatus(user: User) {
    return lastValueFrom(this.http.put<User>('/api/new-bank-account', user ));
  }

  async updateUserBankAccountSatusAll(user: User) {
    return lastValueFrom(this.http.put<User>('/api/users-status-all', user ));
  }


}
