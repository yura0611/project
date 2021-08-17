import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QuestionService} from "../shared/question.service";
import {Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";
import {Constants} from "../../constants/constants";
import {QuestionModalFormComponent} from "../question-modal-form/question-modal-form.component";
import {ModalService} from "../shared/modals.service";


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
  isSorted;

  constructor(private questionService: QuestionService,
              public dialog: MatDialog,
              private constants: Constants,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.questionService.getAllTopics()
    this.questionService.getQuestionByFilters().subscribe();
    this.subscription = this.questionService.availableTopics$.subscribe(data => this.allTopics = data)
  }

  onSort(type: string) {
    this.questionService.sortType(type)
    this.isSorted = this.questionService.isSorted;
  }

  onOpenModal(id, editMode) {
      this.modalService.openModal(id, editMode, QuestionModalFormComponent)
  }

  openViewQuestionModal(id: string) {
    const modalConfig = new MatDialogConfig();
    const questionId = id;
    modalConfig.autoFocus = false;
    modalConfig.width = this.constants.modalWidth.xs;
    modalConfig.height = this.constants.modalHeight.l;
    modalConfig.data = {id: questionId};

    this.dialog.open(QuestionViewModalComponent, modalConfig)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
