import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../questions-library/shared/question.service";
import {AnswerModalService} from "./answer-evaluate-process-modal/shared/answer-modal.service";
import {AnswerEvaluateProcessModalComponent} from "./answer-evaluate-process-modal/answer-evaluate-process-modal.component";


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  allQuestions;
  constructor(private router: Router,
              public dialog: MatDialog,
              private questionService: QuestionService,
              private answerModalService: AnswerModalService ) { }

  ngOnInit(): void {
    this.questionService.questionList$.subscribe()
  }

  navigate(){
    this.router.navigate(['/vacancies-create'])
  }

  openModal() {
    this.answerModalService.openModal(AnswerEvaluateProcessModalComponent)
  }


}
