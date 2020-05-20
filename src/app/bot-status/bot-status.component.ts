import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { BotService } from "../_services";
import { faSync } from '@fortawesome/free-solid-svg-icons';

//standard messages errors
const msg = {
  'off': 'The server is right now off. No error Found.',
  'up': 'The server is right now online. No error Found.',
  'err': 'The server is right now off. An error has ocurred.',
  'fix': 'The server is in maintenance.',
}

@Component({
  selector: 'app-bot-status',
  templateUrl: './bot-status.component.html',
  styleUrls: ['./bot-status.component.css']
})
export class BotStatusComponent implements OnInit, OnChanges {
  log = [];
  faSync = faSync;

  constructor(private bot: BotService) { }

  ngOnInit(): void {
    this.setLog(this.bot.getLog());
    console.log(this.log)
  }

  /**
   * Execute in case status changes
   */
  ngOnChanges(changes: SimpleChanges) {

  }

  //Reload and reset status attribute.
  reload() {
    window.location.reload();
  }

  setLog(log) {
    log.forEach(k => {
      this.log.push({k: msg[k]}) 
    });
  }

  getStatus() {
    var status = this.bot.getStatus();
    console.log(status)
    this.setLog(this.bot.getLog());
    return status;
  }
}
