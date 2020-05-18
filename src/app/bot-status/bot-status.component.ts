import { Component, OnInit } from '@angular/core';
import { BotService } from "../_services";

const msg = {
  'off' : 'The server is right now off. No error Found.',
  'up' : 'The server is right now online. No error Found.',
  'err': 'The server is right now off. An error has ocurred.',
  'fix': 'The server is in maintenance',
}

@Component({
  selector: 'app-bot-status',
  templateUrl: './bot-status.component.html',
  styleUrls: ['./bot-status.component.css']
})
export class BotStatusComponent implements OnInit {
  status;
  log;

  constructor(private bot: BotService) { }

  ngOnInit(): void {
    this.setStatus(this.bot.getStatus())
    this.setLog(this.bot.getLog());
  }

  setStatus(status) {
    this.status = status;
  }

  setLog(log) {
    this.log = log;
  }

  getStatus(){
    return this.status;
  }
}
