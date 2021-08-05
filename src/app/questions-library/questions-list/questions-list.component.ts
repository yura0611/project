import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QuestionService} from "../shared/question.service";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {QuestionNewModalComponent} from "../question-new-modal/question-new-modal.component";
import {QuestionEditModalComponent} from "../question-edit-modal/question-edit-modal.component";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsListComponent implements OnInit {

  allTopics: string[];
  questionList$ = this.questionService.questionList$;
  subscription: Subscription;
  constructor(private questionService: QuestionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.questionService.getAllTopics()
    this.questionService.getQuestionByFilters().subscribe();
    this.subscription = this.questionService.availableTopics$.subscribe(data => this.allTopics = data)

  }

  onSort(type: string) {
    this.questionService.sortType(type)
  }

  openEditModal(id: string) {
    const question = this.questionService.getQuestionById(id)
    const questionId = id;
    const modalConfig = new MatDialogConfig();
    modalConfig.width = '496px';
    modalConfig.height = '850px';
    modalConfig.data = {question:question, questionId:questionId};
    this.dialog.open(QuestionEditModalComponent, modalConfig);
  }

  openCreateNewModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '496px';
    modalConfig.height = '850px';
    this.dialog.open(QuestionNewModalComponent, modalConfig)
  }

  openViewQuestionModal(id: string) {
    const modalConfig = new MatDialogConfig();
    const questionId = id;
    modalConfig.autoFocus = false;
    modalConfig.width = '496px';
    modalConfig.height = '850px';
    modalConfig.data = {id: questionId};

    this.dialog.open(QuestionViewModalComponent, modalConfig)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
