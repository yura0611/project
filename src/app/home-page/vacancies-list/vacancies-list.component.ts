import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { Router } from '@angular/router';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {VacanciesTableItem} from "../../vacancies/vacancies-table/vacancies-table-datasource";
import {HomePageService} from "../shared/home-page.service";
import {IVacancies} from "../../vacancies/shared/vacancies-interface";
import {VacanciesService} from "../../vacancies/shared/vacancies.service";


@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacanciesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<VacanciesTableItem>;
  dataSource;
  displayedColumns = ['title', 'type', 'status', 'avg-score', 'createdAt','arrow'];
  allVacancies: IVacancies[] = [];

  constructor(
    private homeService: HomePageService,
    private vacancyService: VacanciesService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.homeService.getAllVacancies().subscribe((vacancies: IVacancies[]) => {
      this.allVacancies.push(...vacancies)
      this.dataSource = new MatTableDataSource(this.allVacancies)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

  getAvgScore(): number{
    return this.vacancyService.percentage;
  }


  getInfo(id){
    this.router.navigate([`/vacancy-info/${id}`]);
  }


}

