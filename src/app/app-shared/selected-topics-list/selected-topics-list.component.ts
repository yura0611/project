import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ModalService} from "../../questions-library/shared/modals.service";
import {QuestionService} from "../../questions-library/shared/question.service";
import {Subscription} from "rxjs";
import {FormArray} from "@angular/forms";

@Component({
  selector: 'app-selected-topics-list',
  templateUrl: './selected-topics-list.component.html',
  styleUrls: ['./selected-topics-list.component.scss']
})
export class SelectedTopicsListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  @Input() modal
  @Input() customHeight = false;
  availableTopics: string[];
  subscription: Subscription
  constructor(private modalService: ModalService,
              private questionService: QuestionService) { }

  ngOnInit(): void {

    this.subscription = this.questionService.availableTopics$.subscribe(data => this.availableTopics = data);
  }
  get selectedTopics() {
    return (<FormArray> this.modal.get('topics')).getRawValue();
  }

  onRemoveTopic(topic, index) {
    this.modalService.removeTopics(this.modal,index,this.checkBoxInput,topic)

  }

  onShowCheckboxes() {
    this.modalService.showCheckboxes(this.select);
  }

  onAddTopic(input) {
    this.modalService.addTopic(input, this.modal);
  }

  ngAfterViewInit() {
    const topics = (<FormArray> this.modal.get('topics')).getRawValue();
    const checkboxes = this.checkBoxInput.toArray();
    for (let i = 0; i <= checkboxes.length - 1; i++) {
      for (let k = 0; k <= topics.length - 1; k++) {
        if (checkboxes[i].nativeElement.name === topics[k]) {
          checkboxes[i].nativeElement.checked = true;
        }
      }

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
