import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;

  loginUsersForm: FormGroup = this.formBuilder.group({
    id: [],
    email: [ , Validators.compose([Validators.required, Validators.email])],
    password: [ , Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  get id() {
    return this.loginUsersForm.get('id');
  }

  get email() {
    return this.loginUsersForm.get('email');
  }

  get password() {
    return this.loginUsersForm.get('password');
  }

  async login(e: MouseEvent) {
    this.errorMessage = '';
    const user = this.loginUsersForm.value;

    try { 
      await this.authService.login(user);
      this.authService.loggedIn.next(true);
      e.stopPropagation();
      this.isHide = !this.isHide;
      this.navigateToBankBasePage();
    } catch (err: any) { 
      this.errorMessage = err.error.message;
    }
  }

  @HostListener("document:click") hideOnClick() {
    this.isHide = true;
  }

  navigateToBankBasePage() {                      
      this.router.navigate(['/']);
  }
 
}
