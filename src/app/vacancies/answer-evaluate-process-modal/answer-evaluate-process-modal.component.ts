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
  evaluationId;
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
              private route: ActivatedRoute,
              private vacancyService: VacanciesService,
              private answerProcessService: AnswerProcessService) { }

  ngOnInit() {
    this.answerProcessService.disabledValueEmitter.subscribe(data => this.showButton = data)
    this.evaluationId = this.route.snapshot.params['id'];
    this.answerProcessService.answerList$
      .pipe(
        map(el => {
          if (!el.answer) {
            return;
          } else {
            this.showButton = true;
          }
        })
      )
      .subscribe()
    this.route.params.pipe(
      map(value => value.id),
      switchMap(value => this.answerProcessService.getVacancy(value))
    ).subscribe();
  }

  nextItem() {
    this.answerProcessService.nextQuestion()
    this.answerProcessService.sendAnswer(this.evaluationId)


  }

  previousItem() {
    this.answerProcessService.previousQuestion()
    this.answerProcessService.sendAnswer(this.evaluationId)

  }

  initCurrentPosition() {
    return combineLatest(this.questionList$, this.currentQuestion$).pipe(
      filter(obs => obs[0] && obs[1]),
      map(value => {
        const questionList = value[0];
        const currentQuestion = value[1];
        const index = questionList.findIndex(el => el.questionId === currentQuestion.questionId);
        if (index === questionList.length - 1) {
          this.showButton = false;
        } else {
          this.showButton = true;
        }
        return index + 1;
      })
    )
  }

  initTextArea() {
    fromEvent(this.answer.nativeElement, 'input').pipe(
      debounceTime(700),
      distinctUntilChanged(),
      map(() => this.answer.nativeElement.value),
      tap(value => this.answerProcessService.updateAnswer(value)),
      takeWhile(() => this.aliveSubscription)
    ).subscribe()
  }

  onSubmitLastAnswer() {
    let lastAnswer: {question: string, answer: string};
    this.answerProcessService.answerList$.pipe(
      tap(value => {
        lastAnswer = {
          question: value[value.length - 1].question,
          answer: value[value.length - 1].answer
        }
      })
    ).subscribe()
    this.answerProcessService.sendLastAnswer(this.evaluationId, lastAnswer)
  }

  ngOnDestroy() {
    this.aliveSubscription = false;
  }

  ngAfterViewInit() {
    this.initTextArea()
  }

}
