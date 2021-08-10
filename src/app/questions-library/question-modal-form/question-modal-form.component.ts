import {Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {patterns} from "../../app-shared/regexPatterns/patterns";
import {tap} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../shared/question.service";
import {Subscription} from "rxjs";
import {options} from "../../app-shared/inputsOptions";

@Component({
  selector: 'app-question-modal-form',
  templateUrl: './question-modal-form.component.html',
  styleUrls: ['./question-modal-form.component.scss']
})
export class QuestionModalFormComponent implements OnInit {
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  @Input() modal
  @Input() editMode = false;
  availableTopics: string[];
  createNewModal: FormGroup;
  subscription: Subscription
  titleLength = options.titleLength;
  descriptionLength = options.descriptionLength;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private questionService: QuestionService) { }

  ngOnInit(): void {
    console.log(this.editMode)
    console.log(this.modal)
    this.subscription = this.questionService.availableTopics$.subscribe(data => this.availableTopics = data);
    if (!this.editMode) {
      this.modal = new FormGroup({
        'title': new FormControl(null,
          [Validators.maxLength(250), Validators.required, Validators.pattern(patterns.regexOnlyAlphaNumeric)]),
        'description': new FormControl(null,
          [Validators.maxLength(800), Validators.required, Validators.pattern(patterns.regexOnlyAlphaNumeric)]),
        'topics': new FormArray([], [Validators.min(0), Validators.required]),
        'type': new FormControl(),
        'maxLength': new FormControl(null, [Validators.min(1),Validators.max(120),Validators.pattern(patterns.regexOnlyNumbers)])
      });
    } else {
      this.modal = new FormGroup({
        'title': new FormControl(this.data.question.title, [Validators.required, Validators.maxLength(250)]),
        'description': new FormControl(this.data.question.description,
          [Validators.required, Validators.maxLength(800), Validators.pattern(patterns.regexOnlyAlphaNumeric)]),
        'topics': new FormArray(this.data.question.topics.map(el => new FormControl(el)), Validators.required),
        'type': new FormControl(this.data.question.type, Validators.required),
        'maxLength': new FormControl(this.data.question.maxLength,
          [Validators.max(120), Validators.pattern(patterns.regexOnlyNumbers)])
      });
    }

  }

  onSubmit() {
    this.dialogRef.closeAll();
  }

  onClose() {
    this.dialogRef.closeAll();
  }


  onCreate() {
    this.questionService.addNewQuestion(this.modal.value).pipe(
      tap(newQuestion => this.questionService.updateQuestionList(newQuestion.question))
    ).subscribe();
  }

  onEdit() {
    const editedQuestion = {
      '_id': this.data.question._id,
      'title': this.modal.value.title,
      'description': this.modal.value.description,
      'topics': this.modal.value.topics,
      'type': this.modal.value.type,
      'maxLength': this.modal.value.maxLength
    };
    this.questionService.editQuestion(editedQuestion, editedQuestion._id);
  }

  onDelete() {
    this.questionService.deleteQuestion(this.data.question._id);
    this.dialogRef.closeAll();
  }

}
