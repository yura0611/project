import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { VacanciesService} from '../shared/vacancies.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {VacanciesTableItem} from '../../app-shared/interfaces/IVacanciesTableItem';


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
   displayedColumns = ['title', 'type', 'status', 'avg.score', 'createdAt', 'arrow'];
   dataSource;
   data;
   length: number;
   createdAt = 'createdAt';
   value;
   sortedData;
   avgScore;

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
   this.vacanciesService.getAllVacancies().subscribe(vacancies => {
       this.sortedData = this.getMostRecentData(vacancies);
       this.data = new MatTableDataSource(this.sortedData);
       this.data.paginator = this.paginator;
       this.data.sort = this.sort;
     }
   );
   this.getAvgScore();
  }

  getInfo(id): void{
    this.router.navigate([`/vacancy-info/${id}`]);
  }


  getAvgScore(): void{
   this.avgScore = this.vacanciesService.percentage;
  }


  getMostRecentData(data){
    return data.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }


}



