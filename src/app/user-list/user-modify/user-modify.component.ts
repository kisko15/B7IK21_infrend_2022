import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagement } from 'src/app/models/AccountManagement';
import { AccountManagementService } from 'src/app/service/account-management.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
  
})

export class UserModifyComponent implements OnInit {  

  userStatus: string = "aktív"; 
  user: any;
  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;
  accountManagementId?: string;
  accountManagement?: AccountManagement;

  userForm: FormGroup = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: [ , Validators.compose([Validators.required, Validators.pattern(/((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/)])],
    identityCardNumber: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],
    status: [this.userStatus],
    bankAccountStatusAll: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountManagementService: AccountManagementService
  ) { }

  async ngOnInit() {
    this.accountManagementId = this.activatedRoute.snapshot.queryParams['id'];

    if (this.accountManagementId) {
      const user = await this.userService.getUsersById(Number(this.accountManagementId));
      this.userForm.setValue(user!);
    }
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


  async modifyUser(e: MouseEvent) {
    this.user = this.userForm.value;
    this.successMessage = '';
    this.errorMessage = '';

    try {
        await this.userService.updateUsers(this.user);
        e.stopPropagation();
        this.isHide = !this.isHide;
        this.successMessage = 'Ügyfél adatai módosítva!';
    } catch (err: any) { 
      this.errorMessage = err.error.message;
    }
  }

  @HostListener("document:click") hideOnClick() {
    this.isHide = true;
  }

  navigateToUserList() {
    this.router.navigate(['/user-list']);
  }

  async onBlockedStatus() {
    this.userForm.patchValue({
      status: 'zárolt'
    });
    this.user = this.userForm.value;
    await this.userService.updateUsers(this.user);
    await this.accountManagementService.updateAccountManagementSatusAll(this.accountManagement!, this.accountManagementId!);
    await this.userService.updateUserBankAccountSatusAll(this.user);
    this.router.navigate(['/user-list']);
  }
}
