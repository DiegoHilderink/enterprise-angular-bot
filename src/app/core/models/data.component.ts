import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api/api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  data;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.data = this.api.getApi();
    console.log(this.data)
  }

}
