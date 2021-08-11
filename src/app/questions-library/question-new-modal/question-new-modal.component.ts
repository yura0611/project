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
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {options} from "../../app-shared/inputsOptions";

@Component({
  selector: 'app-question-new-modal',
  templateUrl: './question-new-modal.component.html',
  styleUrls: ['./question-new-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionNewModalComponent implements OnInit, OnDestroy {
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  createNewModal: FormGroup;
  titleLength = options.titleLength;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog) {
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.closeAll();
  }

  ngOnDestroy() {

  }

}
