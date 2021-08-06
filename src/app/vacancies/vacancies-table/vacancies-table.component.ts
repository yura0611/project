import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { VacanciesService} from '../shared/vacancies.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {VacanciesTableItem} from "./vacancies-table-datasource";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-vacancies-table',
  templateUrl: './vacancies-table.component.html',
  styleUrls: ['./vacancies-table.component.scss']
})
export class VacanciesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<VacanciesTableItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
   displayedColumns = ['title', 'type', 'status', 'avg-score', 'opened', 'arrow'];
   dataSource;
   data;
   length: number;
   pageIndex: number;
   createdAt = 'createdAt';
   value;
  allVacancies;

  constructor(private router: Router,
              private vacanciesService: VacanciesService
    ) {
    this.dataSource = new MatTableDataSource([]);
  }



  ngOnInit(): void {
    this.initMaterialTable();
    this.vacanciesService.getAllVacancies();
  }

  initMaterialTable = () => {
    // this.data = this.vacanciesService.vacanciesList$;
    //
    // this.length = this.data.length;
   this.vacanciesService.getAllVacancies().subscribe(vacancies => {
       this.data = new MatTableDataSource(vacancies);
       this.data.paginator = this.paginator;
       this.data.sort = this.sort;
     }
   )
  }

  getInfo(id){
    this.router.navigate([`/vacancy-info/${id}`]);
  }



  // edit(row): void{
  //   console.log(row);
  //   this.router.navigate(['/vacancy-info']);
  //   this.message = row;
  //   this.vacanciesService.setMessage(this.message);
  // }

  getAvgScore(): number{
    return this.vacanciesService.percentage;
  }


}



