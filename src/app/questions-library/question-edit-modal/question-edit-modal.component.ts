import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {question, QuestionService} from "../shared/question.service";
import {ModalService} from "../shared/modals.service";

@Component({
  selector: 'app-question-edit-modal',
  templateUrl: './question-edit-modal.component.html',
  styleUrls: ['./question-edit-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionEditModalComponent implements OnInit {

  availableTopics: string[];
  editModal: FormGroup;
  editedQuestion: question;

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
      "maxLength": new FormControl(this.data.question.maxLength, [Validators.required,Validators.pattern(/^\d{10}$/)])
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
    this.editedQuestion = {
      '_id': this.data.question._id,
      "title": this.editModal.value.title,
      "description": this.editModal.value.description,
      "topics": this.editModal.value.topics,
      "type": this.editModal.value.type,
      "maxLength": this.editModal.value.maxLength
    }
    this.questionService.editQuestion(this.editedQuestion, this.editedQuestion._id)
  }
  onDelete() {
    this.questionService.deleteQuestion(this.data.question._id)
    this.dialogRef.closeAll()
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
