import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input()
  users: User[] | undefined;

  searchQuery!:string;

  constructor(
      private userService: UserService,
      private router: Router
    ) { }

  async ngOnInit() {
    this.users = await this.userService.getUsers();
  }

  async search(value: string) {
    this.users = await this.userService.filterUser(this.searchQuery);
  }

  navigateToUserModify(id: number) {
    this.router.navigate(['/user-modify'], {
      queryParams: {
        id: id
      }
    });
  }

  navigateToUserToNewAccount(id: number) {
    this.router.navigate(['/new-bank-account'], {
      queryParams: {
        id: id
      }
    });
  }

  async onReloadDataAndUrl() {
    this.users = await this.userService.getUsers();
    this.router.navigate(['/user-list']);
    console.log("onReload...");
  }

  onCheckUserStatus(status: string) {
    return (status === 'aktív');
  }

}
