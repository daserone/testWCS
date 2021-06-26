import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Character } from '../../models/characters';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.scss']
})
export class CharactersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource ;
  @Input() characters: Character[] = [];

  displayedColumns: string[] = ['name','patronus','age','image'];
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
  
  }
  ngOnChanges(changes: SimpleChanges): void {
  //SI EL ARRAY DE CHARACTERS TIENE DATOS SE MODIFICAN LOS DATOS DE LA TABLA
      if(this.characters.length!=0){
        this.dataSource=new MatTableDataSource(this.characters);
        this.dataSource.sort = this.sort;

      }
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}

