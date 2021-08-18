import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../shared/question.service";
import {IQuestion} from "../../app-shared/interfaces/IQuestion";

@Component({
  selector: 'app-question-view-modal',
  templateUrl: './question-view-modal.component.html',
  styleUrls: ['./question-view-modal.component.scss'],
})
export class QuestionViewModalComponent implements OnInit {

  currentQuestion: IQuestion

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
