import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../shared/question.service";
import {IQuestions} from "../../app-shared/interfaces/IQuestions";

@Component({
  selector: 'app-question-view-modal',
  templateUrl: './question-view-modal.component.html',
  styleUrls: ['./question-view-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionViewModalComponent implements OnInit {

  currentQuestion: IQuestions

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
              private dialogRef: MatDialog,
              private questionService: QuestionService) { }

  ngOnInit(): void {
    this.currentQuestion = this.questionService.getQuestionById(this.data.id)

  }

  onClose() {
    this.dialogRef.closeAll()
  }



}
