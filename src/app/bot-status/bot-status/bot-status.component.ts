import { Component, OnInit } from '@angular/core';
import { BotService } from "../../_services";

@Component({
  selector: 'app-bot-status',
  templateUrl: './bot-status.component.html',
  styleUrls: ['./bot-status.component.css']
})
export class BotStatusComponent implements OnInit {
  private status;

  constructor(private bot: BotService) { }

  ngOnInit(): void {
  }

  getStatus() {
    this.status = this.bot.getStatus()
  }
}
