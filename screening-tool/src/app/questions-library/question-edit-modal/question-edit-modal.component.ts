import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../shared/question.service";
import {ModalService} from "../shared/modals.service";

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionEditModalComponent implements OnInit {

  availableTopics: string[];
  editModal: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
              private dialogRef: MatDialog,
              private questionService: QuestionService,
              public modalService: ModalService) { }

  ngOnInit(): void {

    this.availableTopics = this.questionService.availableTopics
    this.editModal = new FormGroup({
      "title": new FormControl(this.data.question.title, [Validators.required, Validators.max(250)]),
      "description": new FormControl(this.data.question.description, [Validators.required, Validators.max(800)]),
      "topics": new FormArray(this.data.question.topics.map(el => new FormControl(el)), Validators.required),
      "type": new FormControl(this.data.question.type, Validators.required),
      "maxLength": new FormControl(this.data.question.maxLength, Validators.pattern(/^-?(0|[1-9]\d*)?$/))
    })

  }


  getControls() {
    return (<FormArray>this.editModal.get('topics')).getRawValue();
  }
  onSubmit() {
    this.dialogRef.closeAll()
  }
  onClose() {
    this.dialogRef.closeAll()
  }
  onEdit() {
    this.questionService.editQuestion(this.editModal.value, this.data.questionId)
  }
  onDelete() {

  }

  onAddTopic(input,index: number) {
    this.modalService.addTopic(input,index,this.editModal,this.availableTopics)
    console.log('dialog-edit-input',input.value)

  }

  onRemoveTopic(index: number) {
    (<FormArray>this.editModal.controls['topics']).removeAt(index)
    console.log(this.editModal.get('topics').value.length);
  }

  onShowCheckBox() {
    this.modalService.showCheckboxes('edit-modal-checkboxes')
  }

}
