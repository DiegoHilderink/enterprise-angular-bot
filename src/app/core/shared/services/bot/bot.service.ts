import { Injectable } from '@angular/core';
import bot from '../../../../../assets/bot.json';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  blocked;
  conf;

  constructor() {
    this.blocked = bot['blocked'];
    this.conf = bot['bot'];
  }

  getBlocked() {
    return this.blocked;
  }

  addNumber(number){
    this.blocked.push(number);
  }
}
