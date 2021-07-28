import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EXAMPLE_DATA, VacanciesTableDataSource, VacanciesTableItem } from './vacancies-table-datasource';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-vacancies-table',
  templateUrl: './vacancies-table.component.html',
  styleUrls: ['./vacancies-table.component.scss']
})
export class VacanciesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VacanciesTableItem>;
  dataSource: VacanciesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['VACANCIES','TYPE','STATUS','NUMBER OF APPLICATIONS','OPENED','ARROW'];

  constructor(private router: Router,
              private shared: SharedService
    ) {
    this.dataSource = new VacanciesTableDataSource();
  }

  message;
  


  ngOnInit(): void {
   
  }





  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    
  }


  edit(row){
  this.router.navigate(['/vacancies-edit']);
  this.message = row
   this.shared.setMessage(this.message);
  }


}
