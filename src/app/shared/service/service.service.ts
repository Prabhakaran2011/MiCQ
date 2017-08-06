import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServiceService {

  constructor( private _http: Http ) { }

  getData(url: string) {
    return this._http.get(url)
      .map(data => {
        return data.json();
      });
  }  
}
