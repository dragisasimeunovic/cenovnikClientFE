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

  saveCenovnik(cenovnik) {
    return this.http.post(this.url + "/cenovnik/save", cenovnik).map(res=>res.json());
  }

  saveStavkaCenovnika(stavka, cenovnikId) {
    return this.http.post(this.url + "/cenovnik/stavka/save/" + cenovnikId, stavka).map(res=>res.json());
  }

}
