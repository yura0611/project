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
  user: ICandidate;
  vacancy: IVacancy;
  questions: IQuestion[];
  displayedColumns: string[] = ['question', 'status', 'mark'];
  dataSource;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private answerPage: AnswerPageService) { }

  ngOnInit(): void {
    this.answerPage.userAndVacancy$.pipe(
      tap(userData => this.user = userData.user),
      tap(vacancyData => this.vacancy = vacancyData.vacancy),
      tap(vacancyData => this.dataSource = vacancyData.vacancy.questions),
      tap(vacancyData => this.questions = vacancyData.vacancy.questions),

    ).subscribe()
  }

  openModal(question) {
    this.answerPage.openModal(AnswerModalComponent, question, this.questions)
  }



}
