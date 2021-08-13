import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatSortModule} from '@angular/material/sort';
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
  avgScore;


  constructor(
    private homeService: HomePageService,
    private vacancyService: VacanciesService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
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


  // onSortData(sort: Sort) {
  //   let data = this.dataSource.slice();
  //   if (sort.active && sort.direction !== '') {
  //     data = data.sort((a: Element, b: Element) => {
  //       const isAsc = sort.direction === 'asc';
  //       switch (sort.active) {
  //         case 'title': return this.compare(a.title, b.title, isAsc);
  //         default: return 0;
  //       }
  //     });
  //   }
  //   this.dataSource.next(data);
  // }
  //
  // private compare(a, b, isAsc) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }


}

