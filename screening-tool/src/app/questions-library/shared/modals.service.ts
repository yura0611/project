import {Injectable} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  expanded = false;

  constructor() { }


  addTopic(input, index: number, modal, availableTopics) {
    if (!input.checked) {
        this.removeTopics(modal, index, input)
    } else if ((modal.get('topics').value.length >= availableTopics.length) ||
      (modal.get('topics').value.indexOf(input.value) !== -1)) {
      return;
    } else {
      (<FormArray>modal.get('topics')).push(new FormControl(input.value));
    }

  }

  removeTopics(modal, index, input) {
    let topics = (<FormArray>modal.get('topics'))
    topics.removeAt(topics.value.findIndex(topic => topic === input.value))
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

