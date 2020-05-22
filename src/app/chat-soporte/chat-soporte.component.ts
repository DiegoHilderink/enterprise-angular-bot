import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { User } from '../_models';
import { UserService, AuthService } from '../_services';


@Component({
  selector: 'app-chat-soporte',
  templateUrl: './chat-soporte.component.html',
  styleUrls: ['./chat-soporte.component.css']
})
export class ChatSoporteComponent implements OnInit {

  loading = false;
  current: User;
  userFromApi: User;
  faAngleRight = faAngleRight;
  chat = [{ user: "Soporte", msg: "Hola, buenos días, en qué puedo ayudarle." }];

  // answers = {
  //   "Buenos días": "Buenos días" + this.userFromApi.firstName,
  // }

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.current = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getById(this.current.id).pipe(first()).subscribe(user => {
      this.loading = false;
      this.userFromApi = user;
    });
  }

  sendMsg(sender: string) {
    if (sender) {
      this.chat.push({
        user: this.userFromApi.firstName,
        msg: sender
      });
    }

    //this.sendAnswer(sender);
  }

  /**
   * This method allows you to reply according to the message received.
   * @param msg 
   */
  // sendAnswer(msg: string) {
  //   msg.includes()
  // }
}
