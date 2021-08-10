import {Component, Input, OnInit} from '@angular/core';
import {VacanciesService} from '../../shared/vacancies.service';
import {EvaluationService} from '../../shared/evaluation.service';
import {ActivatedRoute, Router} from "@angular/router";
import {VacancyTableService} from "../../shared/vacancy-table.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {
  @Input() vacancyId: string;

  constructor(
    public vacancyService: VacanciesService,
    private vacancyTableService: VacancyTableService,
    public  evaluationService: EvaluationService,
    private router: Router,
    private route: ActivatedRoute) {}

  displayedColumns = ['select', 'candidate', 'status', 'score', 'reviewer', 'invited'];


  ngOnInit(): void{
    this.vacancyService.initMaterialTable();
    this.vacancyService.dataSubject.next(this.vacancyService.dataSource.data.length);
    this.vacancyService.dataSubject.subscribe();
  }

  createReviwerModal(): void{
    this.vacancyService.ReviewerModal();
  }

  toggle(row): void{
    this.vacancyService.selection.toggle(row);
  }

  isSelected(row) {
   return !!this.vacancyService.selection.isSelected(row);
  }

  changeSubject(): void{
    this.vacancyService.toggleSubject();
  }

  getSubjectValue(): number{
    return this.vacancyService.dataSubject.getValue();
  }

  getDataSource() {
    return this.vacancyService.dataSource;
  }

  showCandidate(candidate) {
    const id = this.route.snapshot.params['id']
    this.vacancyTableService.getVacancy(id).pipe(
      map(el => {
        if (el.title !== null && el.questions !== null && el.type !== null) {
          return {
            title: el.title,
            questions: JSON.stringify(el.questions),
            type: el.type,
            candidate: candidate
          }
        }
      }),
      tap(data => {
        this.router.navigate(['/answer'],
          {relativeTo: this.route, queryParams: data})
      })
    ).subscribe()
  }





}



