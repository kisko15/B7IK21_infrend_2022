import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagement } from 'src/app/models/AccountManagement';
import { User } from 'src/app/models/User';
import { AccountManagementService } from 'src/app/service/account-management.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-bank-account',
  templateUrl: './new-bank-account.component.html',
  styleUrls: ['./new-bank-account.component.css']
})
export class NewBankAccountComponent implements OnInit {

  newBankAccount: any;
  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;
  accountOpeningUser?: User | undefined;
  bankAccountCount?: AccountManagement[] | undefined;
  userId?: number;
  bankAccountStatusInit: string = "aktív";

  constructor(
    private formBuilder: FormBuilder,
    private accountManagementService: AccountManagementService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  async ngOnInit(): Promise<void> {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    this.accountOpeningUser = await this.userService.getUsersById(this.userId!);
    this.onInitBankAccountForm();
  }

  bankAccountForm: FormGroup = this.formBuilder.group({
    id: [],
    bankAccount: [],
    balance: [ , Validators.compose([Validators.required, Validators.min(10000)])],
    bankAccountStatus: [],
    user: [this.accountOpeningUser]
  });

  get bankAccount() {
    return this.bankAccountForm.get('bankAccount');
  }

  get balance() {
    return this.bankAccountForm.get('balance');
  }

  get user() {
    return this.bankAccountForm.get('user');
  }

  async onInitBankAccountForm() {
    this.bankAccountCount = await this.accountManagementService.getBankAccount(this.userId!);
    this.bankAccountForm.setValue({
      id: null,
      bankAccount: this.accountOpeningUser?.id + String(this.bankAccountCount!).padStart(4, '0'),
      balance: null,
      bankAccountStatus: this.bankAccountStatusInit,
      user: this.accountOpeningUser
    });
  }

  async createNewBankAccount(e: MouseEvent) {
    this.newBankAccount = this.bankAccountForm.value;
    this.successMessage = '';
    this.errorMessage = '';

    try { 
      await this.accountManagementService.createNewBankAccount(this.newBankAccount!);
      if (this.accountOpeningUser?.bankAccountStatusAll === 'nincs') {
        await this.userService.updateUserAccountManagementSatus(this.accountOpeningUser!);
      }
      this.successMessage = 'Sikeres számla nyitás!';
      e.stopPropagation();
      this.isHide = !this.isHide;
      this.navigateToUserList();
    } catch (err: any) { 
      this.errorMessage = err.error.message;
    }
  }

  @HostListener("document:click") hideOnClick() {
    this.isHide = true;
  }

  navigateToUserList() {
    setTimeout(()=>{                          
      this.router.navigate(['/account-management']);
    }, 1000);
  }

}
