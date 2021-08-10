import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IQuestion} from "../app-shared/interfaces/IQuestions";

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {
  candidate: string;
  vacancy: {title: string, type: string}
  questions: IQuestion[]
  displayedColumns: string[] = ['question', 'status', 'mark', 'timeSpent'];
  dataSource
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(data => {
      this.dataSource = JSON.parse(data.questions);
      this.vacancy = {
        title: data.title,
        type: data.type
      };
      this.candidate = data.candidate;
    })
  }

}
