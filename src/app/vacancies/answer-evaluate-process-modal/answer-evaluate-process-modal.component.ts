import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {VacanciesService} from "../shared/vacancies.service";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, takeWhile, tap} from "rxjs/operators";
import {AnswerProcessService} from "./shared/answer-process.service";
import {combineLatest, fromEvent} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";

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
  questionsListLength
  questionList$ = this.answerProcessService.questionList$.pipe(
    tap(questions => this.questionsListLength = questions.length)
  )
  currentQuestion$ = this.answerProcessService.currentQuestion$;
  currentPosition$ = this.initCurrentPosition();
  currentAnswer$ = this.answerProcessService.currentAnswer$;
  showButton = false;
  answerForm: FormGroup;
  currentAnswerValue$ = this.currentAnswer$.pipe(
    tap(data => console.log(data)),
    filter(data => !!data),
    map(answer => {
      console.log(answer.answer)
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
              private route: ActivatedRoute,
              private vacancyService: VacanciesService,
              private answerProcessService: AnswerProcessService) { }

  ngOnInit() {

    this.route.params.pipe(
      map(value => value.id),
      switchMap(value => this.answerProcessService.getVacancy(value))
    ).subscribe();
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
        if (index === questionList.length - 1) {
          this.showButton = true;
        } else {
          this.showButton = false;
        }
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

  onSubmitAnswer() {
    this.answerProcessService.answerList$.subscribe(data => console.log(data))
  }

  ngOnDestroy() {
    this.aliveSubscription = false;
  }

  ngAfterViewInit() {
    this.initTextArea()
  }

}
