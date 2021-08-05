import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IQuestion, QuestionService} from '../shared/question.service';
import {ModalService} from '../shared/modals.service';
import {options} from "../../inputsOptions";

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionEditModalComponent implements OnInit {
  @ViewChild('expandSelect') select: ElementRef;
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  // This pattern validate only number
  regexPattern = /^[1-9][0-9]*$/;
  availableTopics: string[];
  editModal: FormGroup;
  editedQuestion: IQuestion;
  titleLength = options.titleLength;
  descriptionLength = options.descriptionLength;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private questionService: QuestionService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.availableTopics = this.questionService.availableTopics;
    this.editModal = new FormGroup({
      'title': new FormControl(this.data.question.title, [Validators.required, Validators.max(250)]),
      'description': new FormControl(this.data.question.description, [Validators.required, Validators.max(800)]),
      'topics': new FormArray(this.data.question.topics.map(el => new FormControl(el)), Validators.required),
      'type': new FormControl(this.data.question.type, Validators.required),
      'maxLength': new FormControl(this.data.question.maxLength, Validators.pattern(this.regexPattern))
    });

  }


  onSubmit() {
    this.dialogRef.closeAll();
  }

  onClose() {
    this.dialogRef.closeAll();
  }

  onEdit() {
    this.editedQuestion = {
      '_id': this.data.question._id,
      'title': this.editModal.value.title,
      'description': this.editModal.value.description,
      'topics': this.editModal.value.topics,
      'type': this.editModal.value.type,
      'maxLength': this.editModal.value.maxLength
    };
    this.questionService.editQuestion(this.editedQuestion, this.editedQuestion._id);
  }

  onDelete() {
    this.questionService.deleteQuestion(this.data.question._id);
    this.dialogRef.closeAll();
  }

}
