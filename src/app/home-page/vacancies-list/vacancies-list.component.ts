import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {VacanciesTableDataSource, VacanciesTableItem} from "../../vacancies/vacancies-table/vacancies-table-datasource";

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacanciesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VacanciesTableItem>;
  dataSource: VacanciesTableDataSource;
  displayedColumns = ['VACANCIES','CANDIDATE', 'STATUS', 'REVIEWER'];
  constructor() {
    this.dataSource = new VacanciesTableDataSource();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

}
