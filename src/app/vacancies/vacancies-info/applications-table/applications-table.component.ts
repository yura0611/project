import { Component,  OnInit } from '@angular/core';
import { VacanciesService } from '../../shared/vacancies.service';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {


  constructor(
    public vacancyTableService: VacanciesService) {}

  displayedColumns = ['SELECT', 'CANDIDATE', 'STATUS', 'SCORE', 'REVIEWER', 'INVITED'];


  ngOnInit(): void{
    this.vacancyTableService.initMaterialTable();
    this.vacancyTableService.dataSubject.next(this.vacancyTableService.dataSource.data.length);
    this.vacancyTableService.dataSubject.subscribe();
  }

  createReviwerModal(): void{
    this.vacancyTableService.ReviewerModal();
  }

  toggle(row): void{
    this.vacancyTableService.selection.toggle(row);
  }

  isSelected(row) {
   return !!this.vacancyTableService.selection.isSelected(row);
  }

  changeSubject(): void{
    this.vacancyTableService.toggleSubject();
  }

  getSubjectValue(): number{
    return this.vacancyTableService.dataSubject.getValue();
  }

  get getDataSource() {
    return this.vacancyTableService.dataSource;
  }

}



