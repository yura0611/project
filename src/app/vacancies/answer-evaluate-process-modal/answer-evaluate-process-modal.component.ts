import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {VacanciesService} from "../shared/vacancies.service";
import {debounceTime, distinctUntilChanged, filter, map, takeWhile, tap} from "rxjs/operators";
import {AnswerProcessService} from "./shared/answer-process.service";
import {combineLatest, fromEvent} from "rxjs";

@Component({
  selector: 'app-answer-evaluate-process-modal',
  templateUrl: './answer-evaluate-process-modal.component.html',
  styleUrls: ['./answer-evaluate-process-modal.component.scss']
})
export class AnswerEvaluateProcessModalComponent implements
  OnInit,
  AfterViewInit,
  OnDestroy
{
  @ViewChild('answer') answer: ElementRef;
  questionList$ = this.answerProcessService.questionList$;
  currentQuestion$ = this.answerProcessService.currentQuestion$;
  currentPosition$ = this.initCurrentPosition();
  currentAnswer$ = this.answerProcessService.currentAnswer$;
  currentAnswerValue$ = this.currentAnswer$.pipe(
    filter(data => !!data),
    map(answer => {
      if (answer.answer) {
        return answer.answer
      } else {
        this.answer.nativeElement.value = ''
        return ''
      }
    })
  )
  aliveSubscription = true;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private vacancyService: VacanciesService,
              private answerProcessService: AnswerProcessService) { }

  ngOnInit() {
    this.answerProcessService.getVacancy().pipe(
    ).subscribe()
  }

  closeModal() {
    this.answerProcessService.onClose()
  }

  nextItem() {
    this.answerProcessService.nextQuestion()
  }

  previousItem() {
    this.answerProcessService.previousQuestion()

  }

  initCurrentPosition() {
    return combineLatest(this.questionList$, this.currentQuestion$).pipe(
      filter(obs => obs[0] && obs[1]),
      map(value => {
        const questionList = value[0];
        const currentQuestion = value[1];
        const index = questionList.findIndex(el => el.questionId === currentQuestion.questionId);
        return index + 1;
      })
    )
  }

  initTextArea() {
    fromEvent(this.answer.nativeElement, 'input').pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(() => this.answer.nativeElement.value),
      tap(value => this.answerProcessService.updateAnswer(value)),
      takeWhile(() => this.aliveSubscription)
    ).subscribe()
  }

  ngOnDestroy() {
    this.aliveSubscription = false;
  }

  ngAfterViewInit() {
    this.initTextArea()
  }




}
