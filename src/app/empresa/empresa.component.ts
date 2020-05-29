import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, BotService, AuthService } from '../_services';
import { User, Role } from '../_models';
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
    this.empresa = this.getEmp()
  }

  ngOnInit() {
    this.loading = true;
    console.log(this.empresa)
    this.userService.getByEmp(this.empresa).pipe(first()).subscribe(user => {
      this.loading = false;
      this.user = user;
    });
  }

  getStatus() {
    return this.bot.getStatus();
  }

  delete(id: number) {
    var cont = 0;
    var aux = true
    while (aux) {
      if (this.user[cont].id === id) {
        this.user.splice(cont, 1)
        aux = false;
      } else {
        cont++
      }
    }
  }

  getEmp() {
    if (this.currentUser.role === Role.Admin) {
     return history.state.data
    } else {
      return this.currentUser.empresa
    }
  }
}
