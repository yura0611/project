import {Injectable} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  expanded = false;

  constructor() { }

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

//new branches name
