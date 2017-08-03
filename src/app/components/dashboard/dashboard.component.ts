import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../shared/service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ServiceService]
})
export class DashboardComponent implements OnInit {

  constructor(private _http: ServiceService) { }

  result = {};

  loadJson(){
    this._http.getData('http://date.jsontest.com').subscribe(data=> this.result = data);
  };

  ngOnInit() {
    this.loadJson();
  }

}
