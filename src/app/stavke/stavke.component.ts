import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stavke',
  templateUrl: './stavke.component.html',
  styleUrls: ['./stavke.component.css']
})
export class StavkeComponent implements OnInit {

  displayedColumns = ['naziv', 'kategorija', 'operacije'];
  dataSource = new MatTableDataSource<any>();
  stavke:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  stavkaForm: FormGroup;
  selectedStavka: any;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.dataService.sveStavke().subscribe(data=>{
        this.stavke = data;
        this.dataSource = new MatTableDataSource<any>(this.stavke);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
    })

    this.stavkaForm = new FormGroup({
      naziv: new FormControl('',[Validators.required])
    })


  }

  izmeni(stavka) {
    console.log('izmeni');
    this.stavkaForm.controls['naziv'].setValue(stavka.naziv);
    this.selectedStavka = stavka;
  }

  obrisi(id) {
    //this.router.navigate(['/projekcija', id]);
  }

  save() {
    this.selectedStavka.naziv = this.stavkaForm.value.naziv;
    this.dataService.saveStavka(this.selectedStavka).subscribe(data=>{
      alert('Uspesno sacuvana stavka');
    })
  }

}
