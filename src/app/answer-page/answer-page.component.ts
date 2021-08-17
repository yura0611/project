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
  score = 0;
  answers = []
  constructor(private router: Router,
              private route: ActivatedRoute,
              private answerPage: AnswerPageService) { }

  ngOnInit(): void {

    this.evaluationId = this.route.snapshot.params['evaluationId'];
    this.answerPage.scoreUpdateSubject.next(this.evaluationId)
    this.answerPage.getEvaluation(this.evaluationId).subscribe(data => console.log('fdf',data))
    this.answerPage.getEvaluation(this.evaluationId).pipe(
      // tap(data => {
      //     this.initCurrentScore(data)
      // }),
      tap(data => {
        this.score = data.averageScore
      }),
      tap(val => this.answers.push(val.answers)),
      tap(userData => this.user = userData.candidate),
      tap(vacancyData => this.vacancy = vacancyData.vacancy),
      tap(questionData => this.dataSource = questionData.answers),
    ).subscribe()

  }

  openModal(question) {
    const dialogRef = this.answerPage.openModal(AnswerModalComponent, question.question, this.dataSource, this.evaluationId)
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const answer = this.dataSource.find(item => item.question._id === data.questionId);
        if (answer) {
          answer.status = data.status
          answer.score = data.mark
        }
        // this.calculateScore(data, this.dataSource.length)

      }
    })
  }

  // calculateScore(data, amountOfAnswers) {
  //   let currentScore = this.dataSource.map(item => {
  //     if (item.question._id !== data.questionId) {
  //       if (item.score) {
  //         return item.score
  //       } else{
  //         return 0;
  //       }
  //     } else{
  //       return 0;
  //     }
  //   });
  //   currentScore = currentScore.reduce((acc,curr) => acc + curr);
  //   currentScore += data.mark
  //   this.score = (currentScore * 100)/ (10 * amountOfAnswers)
  //
  // }

  // initCurrentScore(data) {
  //   let amountOfAnswers = 0;
  //   for (let key in data.answers) {
  //     amountOfAnswers++
  //     if (data.answers[key].score) {
  //       this.score += data.answers[key].score
  //     }
  //   }
  //   this.score = (this.score * 100) / (amountOfAnswers*10)
  //   this.vacancyTableService.scoreSubject.next({score: this.score, evalId: this.evaluationId})
  // }

}
