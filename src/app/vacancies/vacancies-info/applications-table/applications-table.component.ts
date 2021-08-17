import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {VacanciesService} from '../../shared/vacancies.service';
import {EvaluationService} from '../../shared/evaluation.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSelectionList} from '@angular/material/list';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {VacanciesTableItem} from '../../../app-shared/interfaces/IVacanciesTableItem';
import {VacancyTableService} from "../../shared/vacancy-table.service";
import {AnswerPageService} from "../../../answer-page/shared/answerPage.service";
import {SetReviewerModalComponent} from "../set-reviewer-modal/set-reviewer-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {Constants} from "../../../constants/constants";
import {Router} from "@angular/router";


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
  candidate
  vacancy
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
    public constants: Constants,
    private router: Router
    ) {
  }

  displayedColumns = [ 'candidate', 'status', 'score', 'reviewer', 'created_at'];


  ngOnInit(): void {
    this.vacancyTableService.scoreSubject.subscribe(data => console.log(data))
    this.vacancyService.vacancyItem$.subscribe(data =>  this.vacancy = data)
    this.initMaterialTable()
  }

  initMaterialTable() {
    this.evaluationService.getEvaluations(this.vacancyId).subscribe();
    this.evaluationService.evaluationList$.subscribe(data => {
      if (data.length !== 0) {
        this.show = false;
        this.evaluationData = new MatTableDataSource(data);
        this.evaluationData.sort = this.sort;
        this.evaluationData.paginator = this.paginator;
      } else {
        this.show = true;
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
    })
  }


  openReviewerModal(id): void {
    const dialogRef = this.dialog.open(SetReviewerModalComponent, {
      width: this.constants.modalWidth.s,
      height: this.constants.modalHeight.s,
    });
    this.evaluationService.evalId = id;

    dialogRef.afterClosed().subscribe();
  }


  showCandidate(evaluationData) {
    this.router.navigate(['/answer', evaluationData._id])
  }

  // get getCurrentVacancy() {
  //   let vacancy;
  //   this.vacancyService.vacancyItem$.subscribe(data => vacancy = data)
  //   return vacancy
  // }



}
