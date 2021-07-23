import {Injectable} from '@angular/core';
import {question, QuestionService} from "./question.service";
import {FormArray, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  currentQuestion: question
  expanded = false;
  private modals: any[] = []

  constructor(private questionService: QuestionService) { }

  add(modal: any) {
    this.modals.push(modal)
    console.log(this.modals)
  }

  remove(modalId: string) {
    this.modals = this.modals.filter(modal => modal.modalId !== modalId)
  }

  open(modalId: string) {
    const modal = this.modals.find(modal => modal.modalId === modalId)
    modal.open()
  }

  close(modalId: string) {
    const modal = this.modals = this.modals.find(modal => modal.modalId === modalId)
    modal.close()
  }

  addTopic(input, index: number, modal, availableTopics) {
    if (input.checked) {
      if ((modal.get('topics').value.length >= availableTopics.length)  ||
        (modal.get('topics').value.indexOf(input.value) !== -1)) {
        return;
      } else {
        (<FormArray>modal.get('topics')).push(new FormControl(input.value));
      }
    }
  }

  showCheckboxes(selector) {
    let checkboxes = document.getElementById(selector);
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }


}
