import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {QuestionService} from '../shared/question.service';
import {ModalService} from '../shared/modals.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-question-new-modal',
  templateUrl: './question-new-modal.component.html',
  styleUrls: ['./question-new-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionNewModalComponent implements OnInit {

  availableTopics: string[];
  createNewModal: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private questionService: QuestionService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.availableTopics = this.questionService.availableTopics;

    this.createNewModal = new FormGroup({
      'title': new FormControl(null, Validators.max(250)),
      'description': new FormControl(null, [Validators.max(800), Validators.required]),
      'topics': new FormArray([], [Validators.min(0), Validators.required]),
      'type': new FormControl(),
      'maxLength': new FormControl(null, Validators.pattern(/^-?(0|[1-9]\d*)?$/))
    });
  }

  getControls() {
    return (<FormArray> this.createNewModal.get('topics')).getRawValue();
  }


  onSubmit(form) {
    this.dialogRef.closeAll();
  }

  onClose() {
    this.dialogRef.closeAll();
  }

  onShowCheckboxes() {
    this.modalService.showCheckboxes('create-new-modal-checkboxes');
  }

  onAddTopic(input, index: number) {
    this.modalService.addTopic(input, index, this.createNewModal, this.availableTopics);
  }

  onRemoveTopic(index: number) {
    (<FormArray> this.createNewModal.controls['topics']).removeAt(index);
  }

  onCreate() {
    this.questionService.addNewQuestion(this.createNewModal.value).pipe(
      tap(newQuestion => this.questionService.updateQuestionList(newQuestion.question))
    ).subscribe();
  }

}
