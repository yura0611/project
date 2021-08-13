import {Inject, Injectable, Optional, Renderer2, RendererFactory2} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {QuestionService} from "./question.service";
import {tap} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Constants} from "../../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  availableTopics: string[] = this.questionService.availableTopics;
  expanded = false;
  renderer: Renderer2
  constructor(rendererFactory: RendererFactory2,
              private questionService: QuestionService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialog,
              private constants: Constants,
              public dialog: MatDialog,) {

    this.renderer = rendererFactory.createRenderer(null,null)
  }

  addTopic(input, modal) {
    if (!input.checked) {
      (<FormArray> modal.controls['topics'])
        .removeAt(modal.get('topics').value.findIndex(el => el === input.name));
    } else if ((modal.get('topics').value.length >= this.availableTopics.length) ||
      (modal.get('topics').value.indexOf(input.value) !== -1)) {
      return;
    } else {
      (<FormArray>modal.get('topics')).push(new FormControl(input.value));
    }

  }

  removeTopics(modal, index, checkBoxes, topic) {
    const inputs = checkBoxes.toArray().reduce((acc, prV) => {
      if (prV.nativeElement) {
        acc.push(prV)
      }
      return acc;
    }, []);
    for(let i = 0; i <= inputs.length - 1; i++) {
      if (inputs[i].nativeElement.name === topic) {
        inputs[i].nativeElement.checked = false;
      }
    }
    (<FormArray> modal.controls['topics']).removeAt(index);
  }

  showCheckboxes(selector) {

    if (!this.expanded) {
      this.renderer.setStyle(selector.nativeElement, 'display', 'block')
      this.expanded = true;

    } else {
      this.renderer.setStyle(selector.nativeElement, 'display', 'none')
      this.expanded = false;

    }

  }

  onSubmit() {
    this.dialogRef.closeAll();
  }

  onClose() {
    this.dialogRef.closeAll();
  }

  onCreate(modal) {
    this.questionService.addNewQuestion(modal.value).pipe(
      tap(newQuestion => this.questionService.updateQuestionList(newQuestion.question))
    ).subscribe();
  }

  onEdit(data, modal) {
    const editedQuestion = {
      '_id': data.question._id,
      'title': modal.value.title,
      'description': modal.value.description,
      'topics': modal.value.topics,
      'type': modal.value.type,
      'maxLength': modal.value.maxLength
    };
    this.questionService.editQuestion(editedQuestion, editedQuestion._id);
  }

  onDelete(data) {
    this.questionService.deleteQuestion(data.question._id);
    this.dialogRef.closeAll();
  }

  openModal(id, editMode, component) {
    if (!editMode) {
      const modalConfig = new MatDialogConfig();
      modalConfig.autoFocus = false;
      modalConfig.width = this.constants.modalWidth.xs;
      modalConfig.height = this.constants.modalHeight.l;
      modalConfig.data = {editMode: false};
      this.dialog.open(component, modalConfig)
    } else {
      const question = this.questionService.getQuestionById(id)
      const questionId = id;
      const modalConfig = new MatDialogConfig();
      modalConfig.width = this.constants.modalWidth.xs;
      modalConfig.height = this.constants.modalHeight.l;
      modalConfig.data = {question: question, questionId: questionId, editMode: true};
      this.dialog.open(component, modalConfig);
    }

  }

}
