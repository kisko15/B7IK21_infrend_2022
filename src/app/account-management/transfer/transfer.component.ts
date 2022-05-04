import { Component, HostListener, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagement } from 'src/app/models/AccountManagement';
import { AccountHistoryService } from 'src/app/service/account-history.service';
import { AccountManagementService } from 'src/app/service/account-management.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  bankStatus?: string = 'aktív';
  commentTransfer: string = 'Banki átutalás';
  accountHistory: any;
  successMessage?: string;
  errorMessage?: string;
  isHide: boolean = true;
  accountManagement?: AccountManagement[];
  bankAccountById?: AccountManagement;

  accountHistoryForm: FormGroup = this.formBuilder.group({
    id: [],
    bankAccount: [],
    beneficiaryBankAccount: [ , Validators.required],
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
    this.accountManagement = await this.accountManagementService.getAllAccountManagementByStatusActive(this.bankStatus!, this.bankAccountById!.bankAccount);
    this.accountHistoryFormInit();
  }

  get id() {
    return this.accountHistoryForm.get('id');
  }

  get bankAccount() {
    return this.accountHistoryForm.get('bankAccount');
  }

  get beneficiaryBankAccount() {
    return this.accountHistoryForm.get('beneficiaryBankAccount');
  }

  get transfer() {
    return this.accountHistoryForm.get('transfer');
  }

  get description() {
    return this.accountHistoryForm.get('description');
  }

  changeBeneficiaryBankAccount(e: any) {
    this.beneficiaryBankAccount?.setValue(e.target.value, {
      onlySelf: true
    });
  }

  accountHistoryFormInit() {
    this.accountHistoryForm.setValue({
      id: null,
      bankAccount: this.bankAccountById?.bankAccount,
      beneficiaryBankAccount: null,
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
    const bankAccountByBeneficiaryBankAccount = await this.accountManagementService.getOneBankAccountByBeneficiaryBankAccount(this.accountHistory.beneficiaryBankAccount);

    try { 
      if(this.bankAccountById!.balance >= this.accountHistory.transfer) {
        await this.accountManagementService.updateBalanceByBankAccount(this.bankAccountById!, this.accountHistory.transfer);
        await this.accountManagementService.updateBalanceByBeneficiaryBankAccount(bankAccountByBeneficiaryBankAccount!, this.accountHistory.transfer);
        await this.accountHistoryService.createAccountHistoryTransfer(this.accountHistory!);
        this.successMessage = 'Sikeres átutalás!';
        this.navigateToAccountManagement();
      } else {
        this.errorMessage = 'Nincs elegendő egyenleg az utaláshoz!';
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
