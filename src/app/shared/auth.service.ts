import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { LoginUsers } from '../models/LoginUsers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  logout() { 
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  async createLoginUser(user: LoginUsers) {
    return lastValueFrom(this.http.post<LoginUsers>('/auth/register', user));
  }

  async login(user: LoginUsers) {
    return lastValueFrom(this.http.post<LoginUsers>('/auth/login', user));
  }

  async findUsersByEmail(email: string) {
    return lastValueFrom(this.http.get('/auth/register', { params: { email }}));
  }
}
