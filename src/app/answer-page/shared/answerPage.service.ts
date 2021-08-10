import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Injectable({providedIn: 'root'})
export class AnswerPageService {

  constructor(private dialog: MatDialog) {
  }

  openModal(component, question, questions) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '760px';
    modalConfig.data = {question: question, allQuestions: questions};
    this.dialog.open(component, modalConfig)
  }

  onClose() {
    this.dialog.closeAll()
  }
}
