import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private url = "http://localhost:9000";

  constructor(private http : Http) { }

  sveStavke() {
    return this.http.get(this.url + "/stavka/getAll").map(res=>res.json());
  }

  saveStavka(stavka) {
    return this.http.post(this.url + "/stavka/save", stavka).map(res=>res.json());
  }


}
