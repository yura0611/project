import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IQuestion} from "../app-shared/interfaces/IQuestion";
import {AnswerPageService} from "./shared/answerPage.service";
import {AnswerModalComponent} from "./answer-modal/answer-modal.component";
import {tap} from "rxjs/operators";
import {IVacancy} from "../app-shared/interfaces/IVacancy";
import {ICandidate} from "../app-shared/interfaces/ICandidate";

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {
  evaluationId;
  user: ICandidate;
  vacancy: IVacancy;
  questions: IQuestion[];
  displayedColumns: string[] = ['question', 'status', 'mark'];
  dataSource;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private answerPage: AnswerPageService) { }

  ngOnInit(): void {
    this.evaluationId = this.route.snapshot.params['evaluationId'];
    this.answerPage.getEvaluation(this.evaluationId).pipe(
      tap(val => console.log('ert',val)),
      tap(val => console.log(val.answers)),
      tap(userData => this.user = userData.candidate),
      tap(vacancyData => this.vacancy = vacancyData.vacancy),
      tap(questionData => this.dataSource = questionData.answers)

    ).subscribe()

  }


  openModal(question) {
    this.answerPage.openModal(AnswerModalComponent, question.question, this.dataSource, this.evaluationId)
  }



}
