import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userStatus: string = "aktív";
  bankAccountStatusAll: string = "nincs";

  userForm: FormGroup = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: [ , Validators.compose([Validators.required, Validators.pattern(/((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/)])],
    identityCardNumber: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
    bankAccountStatusAll: [this.bankAccountStatusAll],
    status: [this.userStatus]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  get name() {
    return this.userForm.get('name');
  }

  get address() {
    return this.userForm.get('address');
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }

  get identityCardNumber() {
    return this.userForm.get('identityCardNumber');
  }

  user: any;
  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;
  searchUser!: User[] | undefined;

  async createUser(e: MouseEvent) {
    this.user = this.userForm.value;
    this.successMessage = '';
    this.errorMessage = '';

    try { 
      this.searchUser = await this.userService.filterUser(this.user.identityCardNumber);

      if(this.searchUser!.length == 0) {
        await this.userService.createUsers(this.user);
        this.successMessage = 'Sikeres regisztráció!';
      } else {
        this.errorMessage = 'Már létezik ez az ügyfél!';
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

  async reloadUsersTable() {
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}


