import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {QuestionService} from "./question.service";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  availableTopics: string[] = this.questionsService.availableTopics;
  expanded = false;
  renderer: Renderer2
  constructor(rendererFactory: RendererFactory2, private questionsService: QuestionService) {

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

}

