import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {HomePageService} from "../shared/home-page.service";
import {IVacancies} from "../../app-shared/interfaces/IVacancies";


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
  displayedColumns = ['title', 'type', 'status', 'avg-score', 'createdAt'];
  allVacancies: IVacancies[] = [];

  constructor(private homeService: HomePageService) {
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

}

