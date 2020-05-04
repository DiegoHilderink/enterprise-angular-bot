import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from './core/shared/services/login';
import { User } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentel-bot';
  faCog = faCog;

  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
