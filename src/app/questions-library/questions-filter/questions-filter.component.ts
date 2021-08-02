import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {IQuestion, QuestionService} from '../shared/question.service';
import {ModalService} from '../shared/modals.service';

@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss']
})
export class QuestionsFilterComponent implements OnInit {

  @ViewChildren('element') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  @ViewChild('questionBlock') questionBlock: ElementRef;
  topics: string[];
  filterForm: FormGroup;
  expanded = false;
  formData: IQuestion;

  constructor(private questionService: QuestionService,
              private modalService: ModalService) {

  }

  ngOnInit(): void {
    this.questionService.topicsEmitter.subscribe(data => this.topics = data);
    this.filterForm = new FormGroup({
      'topics': new FormArray([])
    });
  }


  getControls() {
    return (<FormArray> this.filterForm.get('topics')).getRawValue();
  }

  onSearch() {
    console.log(this.filterForm.value)
    this.questionService.getQuestionByFilters(this.filterForm.value).subscribe();

  }
  onClose(value) {
    console.log(value)
  }

  onSubmit() {
    this.formData = this.filterForm.value;

  }

  onAddTopic(input, index, topic) {
    console.log(input)

    this.modalService.addTopic(input, index, this.filterForm, this.topics, topic);
    console.log(this.checkBoxInput)
  }

  onRemoveTopic(topic, index) {
    this.modalService.removeTopics(this.filterForm,index,this.checkBoxInput,topic)

  }

  onShowCheckboxes() {
    this.modalService.showCheckboxes(this.select);
  }

  getTopic(event) {
    console.log('e',event)
  }

}
