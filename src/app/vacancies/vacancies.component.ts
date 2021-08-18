import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../questions-library/shared/question.service";


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
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.questionService.questionList$.subscribe()
  }

  navigate(){
    this.router.navigate(['/vacancies-create'])
  }

}
