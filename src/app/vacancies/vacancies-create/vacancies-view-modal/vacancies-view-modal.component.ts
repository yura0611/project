import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {IQuestion} from "../../../app-shared/interfaces/IQuestions";


@Component({
  selector: 'app-vacancies-view-modal',
  templateUrl: './vacancies-view-modal.component.html',
  styleUrls: ['./vacancies-view-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacanciesViewModalComponent implements OnInit {
  currentQuestion: IQuestion

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,) {
  }

  ngOnInit(): void {
    this.currentQuestion = this.data
  }

  onClose() {
    this.dialogRef.closeAll()
  }


}
