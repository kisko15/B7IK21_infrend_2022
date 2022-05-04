import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountManagement } from '../models/AccountManagement';
import { AccountHistoryService } from '../service/account-history.service';
import { AccountManagementService } from '../service/account-management.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  @Input()
  accountManagements: AccountManagement[] | undefined;

  accountManagement?: AccountManagement;
  searchQuery!:string;
  

  constructor(
    private accountManagementService: AccountManagementService,
    private router: Router,
    private accountHistoryService: AccountHistoryService
    ) { }

  async ngOnInit(): Promise<void> {
    this.accountManagements = await this.accountManagementService.getAccountManagement();
  }

  async search(value: string) {
    this.accountManagements = await this.accountManagementService.filterAccountManagement(this.searchQuery);
  }

  async getAccountManagementById(id: number) {
    this.accountManagement = await this.accountManagementService.getAccountManagementById(id);
    }

  async blockedBankAccount() {
    await this.accountManagementService.updateAccountManagementSatus(this.accountManagement!);
    await this.accountHistoryService.createAccountHistoryByBlocked(this.accountManagement!);
    this.reloadBankAccountTable();
  }

  async reloadBankAccountTable() {
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

  onCheckBankAccountStatus(status: string) {
    return (status === 'aktív');
  }

  navigateToTransfer(id: number) {
    this.router.navigate(['/transfer'], {
      queryParams: {
        id: id
      }
    });
  }

  navigateToDeposit(id: number) {
    this.router.navigate(['/deposit'], {
      queryParams: {
        id: id
      }
    });
  }

  navigateToPayout(id: number) {
    this.router.navigate(['/payout'], {
      queryParams: {
        id: id
      }
    });
  }

  navigateToAccountHistory(id: number) {
    this.router.navigate(['/account-history'], {
      queryParams: {
        id: id
      }
    });
  }

}
