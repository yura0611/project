import {Component, Input, OnInit} from '@angular/core';
import {VacanciesService} from '../../shared/vacancies.service';
import {EvaluationService} from '../../shared/evaluation.service';
import {VacancyTableService} from "../../shared/vacancy-table.service";
import {MatTableDataSource} from '@angular/material/table';
import {AnswerPageService} from "../../../answer-page/shared/answerPage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {
  @Input() vacancyId: string;
  candidate
  vacancy
  evaluationData;
  show = false;

  constructor(
    public vacancyService: VacanciesService,
    private vacancyTableService: VacancyTableService,
    public evaluationService: EvaluationService,
    private answerPageService: AnswerPageService,
    private router: Router) {
  }

  displayedColumns = ['select', 'candidate', 'status', 'score', 'reviewer', 'invited'];


  ngOnInit(): void {
    this.vacancyTableService.scoreSubject.subscribe(data => console.log(data))
    this.vacancyService.vacancyItem$.subscribe(data =>  this.vacancy = data)
    this.initMaterialTable()
  }

  initMaterialTable() {
    // this.answerPageService.scoreUpdateSubject.subscribe(data => console.log(data))
    this.evaluationService.getEvaluations(this.vacancyId).subscribe(data => {
        if (!data) {
          this.show = true;
        } else {
          this.evaluationData = new MatTableDataSource(data);
        }

      }
    );
  }

  openReviewerModal(): void {
    this.vacancyService.ReviewerModal();
  }

  showCandidate(evaluationData) {
    this.router.navigate(['/answer', evaluationData._id])
  }



}
