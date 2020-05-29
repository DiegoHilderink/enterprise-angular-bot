import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { BotService, UserService, AuthService } from '../_services';
import { User, Role } from '../_models'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  currentUser: User;
  userFromApi: User;

  constructor(
    private bot: BotService,
    private userService: UserService,
    private authenticationService: AuthService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}