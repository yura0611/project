import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AnswerEvaluateProcessModalComponent} from "./answer-evaluate-process-modal/answer-evaluate-process-modal.component";
import {QuestionService} from "../questions-library/shared/question.service";


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  allQuestions;
  constructor(private router: Router, public dialog: MatDialog, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.questionList$.subscribe(data => console.log(data))
  }

  navigate(){
    this.router.navigate(['/vacancies-create'])
  }

  openModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '760px';
    modalConfig.height = '850px';
    this.dialog.open(AnswerEvaluateProcessModalComponent, modalConfig)
    console.log(this.allQuestions)
  }
}
