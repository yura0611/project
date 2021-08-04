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
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  // This pattern validate only number
  regexPattern = /^[1-9][0-9]*$/;
  availableTopics: string[];
  createNewModal: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private questionService: QuestionService,
              public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.questionService.availableTopics$.subscribe(data => this.availableTopics = data);

    this.createNewModal = new FormGroup({
      'title': new FormControl(null, Validators.max(250)),
      'description': new FormControl(null, [Validators.max(800), Validators.required]),
      'topics': new FormArray([], [Validators.min(0), Validators.required]),
      'type': new FormControl(),
      'maxLength': new FormControl(null, Validators.pattern(this.regexPattern))
    });
  }

  getControls() {
    return (<FormArray> this.createNewModal.get('topics')).getRawValue();
  }

  onSubmit() {
    this.dialogRef.closeAll();
  }

  onClose() {
    this.dialogRef.closeAll();
  }

  onShowCheckboxes() {
    this.modalService.showCheckboxes(this.select);
  }

  onAddTopic(input) {
    this.modalService.addTopic(input, this.createNewModal);
  }

  onRemoveTopic(topic, index) {
    this.modalService.removeTopics(this.createNewModal,index,this.checkBoxInput,topic)

  }

  onCreate() {
    this.questionService.addNewQuestion(this.createNewModal.value).pipe(
      tap(newQuestion => this.questionService.updateQuestionList(newQuestion.question))
    ).subscribe();
  }

}
