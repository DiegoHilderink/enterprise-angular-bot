import { Injectable } from '@angular/core';
import bot from '../../../../../assets/bot.json';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  blocked;
  conf;
  users;

  constructor() {
    this.blocked = bot['blocked'];
    this.conf = bot['bot'];
    this.users = bot['users'];
  }

  getBlocked() {
    return this.blocked;
  }

  getUsers() {
    return this.users;
  }

  addNumber(number){
    this.blocked.push(number);
  }
}
