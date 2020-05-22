import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, BotService, AuthService } from '../_services';
import { User } from '../_models';
import { faCog, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  loading = false;
  user;
  currentUser: User;
  empresa: string

  faBull = faBullseye;
  faCog = faCog;

  constructor(
    private userService: UserService,
    private authenticationService: AuthService,
    private bot: BotService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.empresa = this.currentUser.empresa
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getByEmp(this.empresa).pipe(first()).subscribe(user => {
      this.loading = false;
      this.user = user;
      console.log(this.user)
    });
  }

  getStatus() {
    return this.bot.getStatus();
  }
}
