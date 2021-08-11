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
import {FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {options} from "../../app-shared/inputsOptions";
import {IQuestion} from "../../app-shared/interfaces/IQuestion";

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionEditModalComponent implements OnInit {
  @ViewChild('expandSelect') select: ElementRef;
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  editModal: FormGroup;
  editedQuestion: IQuestion;
  titleLength = options.titleLength;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.closeAll();
  }


}
