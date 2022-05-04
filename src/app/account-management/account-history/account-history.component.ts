import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountHistory } from 'src/app/models/AccountHistory';
import { AccountHistoryService } from 'src/app/service/account-history.service';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {

  @Input()
  accountHistory: AccountHistory[] | undefined;

  accountHistoryId?: number;
  searchQuery!:string;
  marker?: string;

  constructor(
    private accountHistoryService: AccountHistoryService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.accountHistoryId = this.activatedRoute.snapshot.queryParams['id'];
    this.accountHistory = await this.accountHistoryService.getAccountHistory(this.accountHistoryId!);
  }

  checkTransfer(comment: string) {
    if(comment === "Befizetés") {
      this.marker = '+';
      return true;
    }
    this.marker = '-';
    return true;
  }

  async search(value: string) {
    this.accountHistory = await this.accountHistoryService.filterAccountHistory(this.searchQuery, this.accountHistoryId!);
  }

}
