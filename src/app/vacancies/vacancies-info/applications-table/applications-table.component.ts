import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {VacanciesService} from '../../shared/vacancies.service';
import {EvaluationService} from '../../shared/evaluation.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {VacanciesTableItem} from '../../../app-shared/interfaces/IVacanciesTableItem';
import {VacancyTableService} from "../../shared/vacancy-table.service";
import {MatTableDataSource} from '@angular/material/table';
import {AnswerPageService} from "../../../answer-page/shared/answerPage.service";


@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {
  @ViewChild(MatSelectionList, {static: true}) selectionList: MatSelectionList;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<VacanciesTableItem>;
  @Input() vacancyId: string;

  evaluationData;
  show = false;


  constructor(
    public vacancyService: VacanciesService,
    private vacancyTableService: VacancyTableService,
    public evaluationService: EvaluationService,
    private answerPageService: AnswerPageService) {
  }

  displayedColumns = ['select', 'candidate', 'status', 'score', 'reviewer', 'created_at'];


  ngOnInit(): void {
    this.initMaterialTable()
  }

  initMaterialTable() {
    this.evaluationService.getEvaluations(this.vacancyId).subscribe(data => {
        if (!data.length) {
          this.show = true;
        }
        else{
          this.evaluationData = new MatTableDataSource(data);
          this.evaluationData.sort = this.sort;
          this.evaluationData.paginator = this.paginator;
          this.evaluationData.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
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



