import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {VacanciesService} from "../shared/vacancies.service";
import {tap} from "rxjs/operators";
import {PaginationService} from "../../pagination.service";
import {AnswerModalService} from "./shared/answer-modal.service";
import {IEvaluationProcess} from "../../app-shared/interfaces/IEvaluationProcess";



@Component({
  selector: 'app-answer-evaluate-process-modal',
  templateUrl: './answer-evaluate-process-modal.component.html',
  styleUrls: ['./answer-evaluate-process-modal.component.scss']
})
export class AnswerEvaluateProcessModalComponent implements OnInit, AfterViewInit {

  currentQuestion = [];
  currentItem = 0;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private vacancyService: VacanciesService,
              private paginationService: PaginationService,
              private answerModalService: AnswerModalService) { }

  ngOnInit() {
     this.paginationService.itemSubject.pipe(
      tap(value => this.currentItem = value)
    ).subscribe()
    this.answerModalService.getVacancy().pipe(
      tap(el => console.log(el)),
      tap((vacancyData: IEvaluationProcess) => this.currentQuestion = vacancyData.vacancy.questions)
    ).subscribe()

  }

  nextItem() {

    this.paginationService.next(this.currentQuestion)

  }

  previousItem() {
    this.paginationService.previous(this.currentQuestion)

  }
  ngAfterViewInit() {
  }




}
