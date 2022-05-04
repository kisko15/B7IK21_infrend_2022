import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;

  registerUsersForm: FormGroup = this.formBuilder.group({
    id: [],
    email: ['' , Validators.compose([Validators.required, Validators.email])],
    password: ['' , Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.registerUsersForm.get('email');
  }

  get password() {
    return this.registerUsersForm.get('password');
  }

  async register(e: MouseEvent) {
    this.successMessage = '';
    this.errorMessage = '';
    const user = this.registerUsersForm.value;
    const emailCount = await this.authService.findUsersByEmail(user.email);
    console.log(emailCount)

    try { 
      if(emailCount > 0) {
        this.errorMessage = "Már létezik ez az email!";
      } else {
        await this.authService.createLoginUser(user);
        this.successMessage = "Sikeres regisztráció";
        this.navigateToLogin();
      }
      e.stopPropagation();
      this.isHide = !this.isHide;
    } catch (err: any) { 
      this.errorMessage = err.error.message;
    }
  }

  @HostListener("document:click") hideOnClick() {
    this.isHide = true;
  }

  navigateToLogin() {
    setTimeout(()=>{                          
      this.router.navigate(['/login']);
    }, 1000);
  }
}
