import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Router } from '@angular/router';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {HomePageService} from '../shared/home-page.service';
import {IVacancy} from '../../app-shared/interfaces/IVacancy';
import {VacanciesService} from '../../vacancies/shared/vacancies.service';


@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacanciesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  dataSource;
  displayedColumns = ['title', 'type', 'status', 'avg-score', 'createdAt', 'arrow'];
  allVacancies: IVacancy[] = [];
  sortedVacancies: IVacancy[] = [];

  constructor(
    private homeService: HomePageService,
    private vacancyService: VacanciesService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.homeService.getAllVacancies().subscribe((vacancies: IVacancy[]) => {
      this.allVacancies.push(...vacancies);
      this.sortedVacancies.push(...this.getMostRecentData(this.allVacancies));
      this.dataSource = new MatTableDataSource(this.sortedVacancies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.getAvgScore();
  }

  getMostRecentData(data){
    return data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }



  getAvgScore(): void{
    this.avgScore = this.vacancyService.percentage;
  }


  getInfo(id): void{
    this.router.navigate([`/vacancy-info/${id}`]);
  }


}

