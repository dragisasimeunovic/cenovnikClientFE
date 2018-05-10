import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  displayedColumns = ['naziv', 'kategorija', 'operacije'];
  displayedColumnsCenovnik = ['naziv', 'kategorija', 'cena', 'operacije'];
  dataSource = new MatTableDataSource<any>();
  dataSourceCenovnik = new MatTableDataSource<any>();
  stavke:any;
  stavkeCenovnika: any;


  @ViewChild(MatSort) sortStavke: MatSort;
  @ViewChild(MatPaginator) paginatorStavke: MatPaginator;

  @ViewChild('cenovnik', {read: MatSort}) sortCenovnik: MatSort;
  @ViewChild('cenovnik', {read: MatPaginator}) paginatorCenovnik: MatPaginator;


  stavkaCenovnikaForm: FormGroup;
  selectedStavka: any;

  cenovnikForm: FormGroup;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.stavkeCenovnika = [];

    this.dataService.sveStavke().subscribe(data=>{
        this.stavke = data;
        this.dataSource = new MatTableDataSource<any>(this.stavke);
        this.dataSource.sort = this.sortStavke;
        this.dataSource.paginator = this.paginatorStavke;

        this.dataSourceCenovnik = new MatTableDataSource<any>(this.stavkeCenovnika);
        this.dataSourceCenovnik.sort = this.sortCenovnik;
        this.dataSourceCenovnik.paginator = this.paginatorCenovnik;
       
    })

     this.stavkaCenovnikaForm = new FormGroup({
        naziv: new FormControl('',[Validators.required]),
        kategorija: new FormControl('',[Validators.required]),
        cena: new FormControl('',[Validators.required])
      })

      this.cenovnikForm = new FormGroup({
        datumPocetka: new FormControl('',[Validators.required])
      })

  }

  dodaj(stavka) {

    for (var i = 0; i < this.stavkeCenovnika.length; i++) {
      if (this.stavkeCenovnika[i].id === stavka.id) {
        alert('Stavka se vec nalazi u cenovniku');
        return;
      }
    }

    this.selectedStavka = stavka;
    this.stavkaCenovnikaForm.controls['naziv'].setValue(stavka.naziv);
    this.stavkaCenovnikaForm.controls['kategorija'].setValue(stavka.kategorija);
    this.stavkaCenovnikaForm.controls['cena'].setValue(null);
  }

  save() {
    var stavkaCenovnika = this.stavkaCenovnikaForm.value;
    stavkaCenovnika.id = this.selectedStavka.id;
    console.log(stavkaCenovnika);
    this.stavkeCenovnika.push(stavkaCenovnika);
    this.dataSourceCenovnik = new MatTableDataSource<any>(this.stavkeCenovnika);
    this.stavkaCenovnikaForm.reset();
  }

  obrisiStavkuCenovnika(stavkaCenovnika) {
    const index: number = this.stavkeCenovnika.indexOf(stavkaCenovnika);
    if (index !== -1) {
        this.stavkeCenovnika.splice(index, 1);
    }
    this.dataSourceCenovnik = new MatTableDataSource<any>(this.stavkeCenovnika);
  }

  izmeniStavkuCenovnika(stavkaCenovnika) {
    this.dodaj(stavkaCenovnika);
    this.dataSourceCenovnik = new MatTableDataSource<any>(this.stavkeCenovnika);
  }

  saveCenovnik() {
    this.dataService.saveCenovnik(this.cenovnikForm.value).subscribe(data=>{
      for (var i = 0; i < this.stavkeCenovnika.length; i++) {
        this.dataService.saveStavkaCenovnika(this.stavkeCenovnika[i], data.id).subscribe(data=>{
          console.log(data);
        })
      }
      this.stavkeCenovnika = [];
      this.dataSourceCenovnik = new MatTableDataSource<any>(this.stavkeCenovnika);
      this.dataSourceCenovnik.sort = this.sortCenovnik;
      this.dataSourceCenovnik.paginator = this.paginatorCenovnik;
    })
  }

}
