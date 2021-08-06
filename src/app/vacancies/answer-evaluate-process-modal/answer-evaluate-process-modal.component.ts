import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {VacanciesService} from "../shared/vacancies.service";
import {tap} from "rxjs/operators";
import {IVacancies} from "../../home-page/shared/home-page.service";
import {PaginationService} from "../../pagination.service";

export interface IEvaluationProcess {
  candidate: {
    role: string,
    isActive: boolean,
    _id: string,
    email: string,
    firstName: string,
    lastName: string,
  };
  vacancy: IVacancies,
  answers: {
    _id: string;
    questionId: string;
  }
}

@Component({
  selector: 'app-answer-evaluate-process-modal',
  templateUrl: './answer-evaluate-process-modal.component.html',
  styleUrls: ['./answer-evaluate-process-modal.component.scss']
})
export class AnswerEvaluateProcessModalComponent implements OnInit, AfterViewInit {

  allQuestions
  currentQuestion = []
  currentItem = 0;
  testData = []
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private vacancyService: VacanciesService,
              private paginationService: PaginationService) { }

  ngOnInit() {
     this.paginationService.itemSubject.pipe(
      tap(value => this.currentItem = value)
    ).subscribe()

    console.log('test data',this.testData)
    console.log(this.currentQuestion)
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
