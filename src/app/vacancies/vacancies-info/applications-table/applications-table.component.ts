import {Component, Input, OnInit} from '@angular/core';
import {VacanciesService} from '../../shared/vacancies.service';
import {EvaluationService} from '../../shared/evaluation.service';
import {VacancyTableService} from "../../shared/vacancy-table.service";
import {MatTableDataSource} from '@angular/material/table';
import {AnswerPageService} from "../../../answer-page/shared/answerPage.service";


@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {
  @Input() vacancyId: string;

  evaluationData;
  show = false;

  constructor(
    public vacancyService: VacanciesService,
    private vacancyTableService: VacancyTableService,
    public evaluationService: EvaluationService,
    private answerPageService: AnswerPageService) {
  }

  displayedColumns = ['select', 'candidate', 'status', 'score', 'reviewer', 'invited'];


  ngOnInit(): void {
    this.initMaterialTable()
  }

  initMaterialTable() {
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

  showCandidate(candidate) {
    const candidateData = candidate;
    const vacancy = this.getCurrentVacancy;
    this.answerPageService.getUserAndVacancy(candidateData, vacancy)
  }
  get getCurrentVacancy() {
    let vacancy;
    this.vacancyService.vacancyItem$.subscribe(data => vacancy = data)
    return vacancy

  }
}



