import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { VacanciesService} from '../shared/vacancies.service';


@Component({
  selector: 'app-vacancies-table',
  templateUrl: './vacancies-table.component.html',
  styleUrls: ['./vacancies-table.component.scss']
})
export class VacanciesTableComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
   displayedColumns = ['VACANCIES', 'TYPE', 'STATUS', 'AVG SCORE', 'OPENED', 'ARROW'];




  constructor(private router: Router,
              private vacanciesService: VacanciesService
    ) {
  }

  // message;
  data;
  length: number;
  pageIndex: number;
  createdAt = 'createdAt';



  ngOnInit(): void {
    this.initMaterialTable();
    this.vacanciesService.getAllVacancies();
  }

  initMaterialTable = () => {
    this.data = this.vacanciesService.vacanciesList$;
    this.length = this.data.length;
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



