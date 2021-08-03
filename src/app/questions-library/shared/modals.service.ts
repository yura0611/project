import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  expanded = false;
  renderer: Renderer2

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null,null)
  }


  addTopic(input, index: number, modal, availableTopics, topic) {
    if (!input.checked) {
        this.removeTopics(modal, index, input, topic)
    } else if ((modal.get('topics').value.length >= availableTopics.length) ||
      (modal.get('topics').value.indexOf(input.value) !== -1)) {
      return;
    } else {
      (<FormArray>modal.get('topics')).push(new FormControl(input.value));
    }

  }

  removeTopics(modal, index, checkBoxes, topic) {
    let inputs = []
    checkBoxes.toArray().filter(el => el.nativeElement).map(el => inputs.push(el));
    console.log(inputs);
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

