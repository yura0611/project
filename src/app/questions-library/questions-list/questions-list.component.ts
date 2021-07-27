import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {question, QuestionService} from "../shared/question.service";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {QuestionNewModalComponent} from "../question-new-modal/question-new-modal.component";
import {QuestionEditModalComponent} from "../question-edit-modal/question-edit-modal.component";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsListComponent implements OnInit {
  allTopics: [];
  // questionList: question[] = [];
  questionList$ = this.questionService.questionList$;
  subscription: Subscription;
  constructor(private questionService: QuestionService, public dialog: MatDialog) { }

  ngOnInit() {
    this.questionService.getAllTopics()
    this.questionService.getQuestionByFilters().subscribe();
    this.questionService.questionList$.subscribe()
    // this.questionService.questionByFilters.subscribe(data => this.questionList = data)

    // this.questionService.getAllQuestions().pipe(
    //   tap(questionList => this.questionService.questionList = questionList),
    // ).subscribe(data => {
    //   console.log('question from back', data)
    //   this.questionList = data
    // })

    // this.questionService.questionList$.pipe(
    //   tap(question => console.log('question from subject', question)),
    //   tap(questionList => this.questionList.push(...questionList)),
    // ).subscribe(value => {}, error => {}, () => console.log('good game'))

    this.subscription = this.questionService.topicsEmitter.subscribe(data => this.allTopics = data)

    // this.subscription.add(this.questionService.changedQuestion.subscribe((question: question) => {
    //   console.log('from question list component', question)
    //   this.questionList.find(el => {
    //     if (el._id === question._id) {
    //       this.questionList[this.questionList.findIndex(el => el._id === question._id)] = question
    //     }
    //   })
    // }))

    // this.subscription.add(this.questionService.questionsAfterDelete.
    // subscribe(data => this.questionList = data))
    // console.log('from component',this.questionList);
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
