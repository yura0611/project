import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IQuestion} from "../app-shared/interfaces/IQuestions";
import {AnswerPageService} from "./shared/answerPage.service";
import {AnswerModalComponent} from "./answer-modal/answer-modal.component";

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {
  candidate: string;
  vacancy: {title: string, type: string}
  questions: IQuestion[]
  displayedColumns: string[] = ['question', 'status', 'mark'];
  dataSource
  constructor(private router: Router,
              private route: ActivatedRoute,
              private answerPage: AnswerPageService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(data => {
      console.log(JSON.parse(data.questions))
      this.questions = JSON.parse(data.questions);
      this.dataSource = JSON.parse(data.questions);
      this.vacancy = {
        title: data.title,
        type: data.type,
      };
      this.candidate = data.candidate;
    })
  }

  openModal(question) {
    this.answerPage.openModal(AnswerModalComponent, question, this.questions)
  }

}
