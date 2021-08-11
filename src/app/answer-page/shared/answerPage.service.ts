import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Constants} from "../../constants/constants";

@Injectable({providedIn: 'root'})
export class AnswerPageService {

  constructor(private dialog: MatDialog,
              private constants: Constants) {
  }

  openModal(component, question, questions) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = this.constants.answerModalWidth;
    modalConfig.data = {question: question, allQuestions: questions};
    this.dialog.open(component, modalConfig)
  }

  onClose() {
    this.dialog.closeAll()
  }
}
