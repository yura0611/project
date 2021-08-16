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
import {AnswerPageService} from "../../../answer-page/shared/answerPage.service";
import {SetReviewerModalComponent} from "../set-reviewer-modal/set-reviewer-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {Constants} from "../../../constants/constants";


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
  evalId;
  reviewer

  constructor(
    public vacancyService: VacanciesService,
    private vacancyTableService: VacancyTableService,
    public evaluationService: EvaluationService,
    public dialog: MatDialog,
    private answerPageService: AnswerPageService,
    public constants: Constants) {
  }

  displayedColumns = ['select', 'candidate', 'status', 'score', 'reviewer', 'created_at'];


  ngOnInit(): void {
    this.initMaterialTable()

  }

  initMaterialTable() {
    this.evaluationService.getEvaluations(this.vacancyId).subscribe();
    this.evaluationService.evaluationList$.subscribe(data => {
      console.log(data.length);
      if (data.length !== 0) {
        this.show = false;
        this.evaluationData = new MatTableDataSource(data);
        this.evaluationData.sort = this.sort;
        this.evaluationData.paginator = this.paginator;
      }
      else {
        this.show = true;
      }
    })
  }

  openReviewerModal(id): void {
    const dialogRef = this.dialog.open(SetReviewerModalComponent, {
      width: this.constants.modalWidth.s,
      height: this.constants.modalHeight.m,
    });
    this.evaluationService.evalId = id;

    dialogRef.afterClosed().subscribe();
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



