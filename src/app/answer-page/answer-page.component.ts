import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})
export class AnswerPageComponent implements OnInit {
  candidate: string
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.candidate = this.route.snapshot.queryParams['candidate'];
  }

}
