import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagement } from 'src/app/models/AccountManagement';
import { AccountHistoryService } from 'src/app/service/account-history.service';
import { AccountManagementService } from 'src/app/service/account-management.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent implements OnInit {

  bankAccountById?: AccountManagement;
  commentTransfer: string = 'Kifizetés';
  accountHistory: any;
  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;

  accountHistoryForm: FormGroup = this.formBuilder.group({
    id: [],
    bankAccount: [],
    beneficiaryBankAccount: [],
    transfer: [ , Validators.compose([Validators.required, Validators.min(500)])],
    comment: [],
    description: [''],
    accountManagement: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountHistoryService: AccountHistoryService,
    private accountManagementService: AccountManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.bankAccountById = await this.accountManagementService.getAccountManagementById(id);
    this.accountHistoryFormInit();
  }

  get id() {
    return this.accountHistoryForm.get('id');
  }

  get transfer() {
    return this.accountHistoryForm.get('transfer');
  }

  accountHistoryFormInit() {
    this.accountHistoryForm.setValue({
      id: null,
      bankAccount: this.bankAccountById?.bankAccount,
      beneficiaryBankAccount: '',
      transfer: null,
      comment: this.commentTransfer,
      description: '',
      accountManagement: this.bankAccountById
    });
  }

  async createAccountHistory(e: MouseEvent) {
    this.accountHistory = this.accountHistoryForm.value;
    this.successMessage = '';
    this.errorMessage = '';

    try { 
      if(this.bankAccountById!.balance >= this.accountHistory.transfer) {
        await this.accountManagementService.updateBalanceByBankAccount(this.bankAccountById!, this.accountHistory.transfer);
        await this.accountHistoryService.createAccountHistoryTransfer(this.accountHistory!);
        this.successMessage = 'Sikeres kifizetés!';
        this.navigateToAccountManagement();
      } else {
        this.errorMessage = 'Nincs elegendő egyenleg a kifizetéshez!';
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

  navigateToAccountManagement() {
    setTimeout(()=>{                          
      this.router.navigate(['/account-management']);
    }, 1000);
  }

}
