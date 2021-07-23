import { Component, OnInit } from '@angular/core';
import {question, QuestionService} from "../shared/question.service";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {QuestionNewModalComponent} from "../question-new-modal/question-new-modal.component";
import {QuestionEditModalComponent} from "../question-edit-modal/question-edit-modal.component";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  questionList: question[] = []
  subscription: Subscription

  constructor(private questionService: QuestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.questionList = this.questionService.getAllQuestions()
    this.subscription = this.questionService.questionEmitter.subscribe((questions: question[]) => {
      this.questionList = questions;
    })
    this.subscription = this.questionService.changedQuestion.subscribe((questions: question[]) => {
      console.log('from question list component', questions)
      this.questionList = questions
    })

    console.log('from component',this.questionList);
  }

  onSort(type: string) {
    this.questionService.sortType(type)
  }

  openEditModal(id: number) {
    const question = this.questionService.getQuestionById(id)
    const questionId = id;
    const modalConfig = new MatDialogConfig();
    modalConfig.width = '496px';
    modalConfig.data = {question:question, questionId:questionId};
    this.dialog.open(QuestionEditModalComponent, modalConfig);
  }

  openCreateNewModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '496px';
    this.dialog.open(QuestionNewModalComponent, modalConfig)
  }

  openViewQuestionModal(id: number) {
    const modalConfig = new MatDialogConfig();
    const questionId = id;
    modalConfig.autoFocus = false;
    modalConfig.width = '496px';
    modalConfig.data = {id: questionId};

    this.dialog.open(QuestionViewModalComponent, modalConfig)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
