import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {patterns} from "../../app-shared/regexPatterns/patterns";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../shared/question.service";
import {Subscription} from "rxjs";
import {options} from "../../app-shared/inputsOptions";
import {ModalService} from "../shared/modals.service";

@Component({
  selector: 'app-question-modal-form',
  templateUrl: './question-modal-form.component.html',
  styleUrls: ['./question-modal-form.component.scss']
})
export class QuestionModalFormComponent implements OnInit {
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  @Input() modal
  editMode = false;
  availableTopics: string[];
  subscription: Subscription;
  titleLength = options.titleLength;
  descriptionLength = options.descriptionLength;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private questionService: QuestionService,
              private modalService: ModalService
  ) {
  }

  ngOnInit(): void {

    this.editMode = this.data.editMode;
    this.subscription = this.questionService.availableTopics$.subscribe(data => this.availableTopics = data);
    if (!this.data.editMode) {
      this.modal = new FormGroup({
        'title': new FormControl(null,
          [Validators.maxLength(200), Validators.required]),
        'description': new FormControl(null,
          [Validators.maxLength(800), Validators.required]),
        'topics': new FormArray([], [Validators.min(0), Validators.required]),
        'type': new FormControl(),
        'maxLength': new FormControl(null, [Validators.min(1), Validators.max(120), Validators.pattern(patterns.regexOnlyNumbers)])
      });

    } else {
      this.modal = new FormGroup({
        'title': new FormControl(this.data.question.title.trim(),
          [Validators.required, Validators.maxLength(200)]),
        'description': new FormControl(this.data.question.description.trim(),
          [Validators.required, Validators.maxLength(800)]),
        'topics': new FormArray(this.data.question.topics.map(el => new FormControl(el)), Validators.required),
        'type': new FormControl(this.data.question.type, Validators.required),
        'maxLength': new FormControl(this.data.question.maxLength,
          [Validators.max(120), Validators.pattern(patterns.regexOnlyNumbers)])
      });
    }

  }

  onSubmit() {
    this.modalService.onSubmit()
  }

  onClose() {
    this.modalService.onClose()
  }

  onCreate() {
    const newQuestion = {
      title: this.modal.value.title.trim(),
      description: this.modal.value.description.trim(),
      topics: [...this.modal.value.topics],
      type: this.modal.value.type,
      maxLength: this.modal.value.maxLength
    }
    this.modalService.onCreate(newQuestion)
  }

  onEdit() {
    this.modalService.onEdit(this.data, this.modal)

  }

  onDelete() {
    this.modalService.onDelete(this.data)

  }

}
