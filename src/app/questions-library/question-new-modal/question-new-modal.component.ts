import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {QuestionService} from '../shared/question.service';
import {tap} from 'rxjs/operators';
import {Subscription} from "rxjs";
import {options} from "../../inputsOptions";

@Component({
  selector: 'app-question-new-modal',
  templateUrl: './question-new-modal.component.html',
  styleUrls: ['./question-new-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionNewModalComponent implements OnInit, OnDestroy {
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  // This pattern validate only number
  regexPattern = /^[1-9][0-9]*$/;
  availableTopics: string[];
  createNewModal: FormGroup;
  subscription: Subscription
  titleLength = options.titleLength;
  descriptionLength = options.descriptionLength;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.subscription = this.questionService.availableTopics$.subscribe(data => this.availableTopics = data);

    this.createNewModal = new FormGroup({
      'title': new FormControl(null, Validators.max(250)),
      'description': new FormControl(null, [Validators.max(800), Validators.required]),
      'topics': new FormArray([], [Validators.min(0), Validators.required]),
      'type': new FormControl(),
      'maxLength': new FormControl(null, Validators.pattern(this.regexPattern))
    });
  }

  onSubmit() {
    this.dialogRef.closeAll();
  }

  onClose() {
    this.dialogRef.closeAll();
  }


  onCreate() {
    this.questionService.addNewQuestion(this.createNewModal.value).pipe(
      tap(newQuestion => this.questionService.updateQuestionList(newQuestion.question))
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
