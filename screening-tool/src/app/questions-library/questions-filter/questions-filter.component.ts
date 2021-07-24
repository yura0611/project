import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {question, QuestionService} from "../shared/question.service";
import {ModalService} from "../shared/modals.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss']
})
export class QuestionsFilterComponent implements OnInit {

  @ViewChild('element') checkBoxInput: ElementRef
  topics: string[];
  filterForm: FormGroup;
  expanded = false;
  formData: question
  QuestionByFilter = 'http://localhost:3000/api/question/filtered'
  constructor( private questionService: QuestionService, private modalService: ModalService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.topics = this.questionService.availableTopics
    this.questionService.topicsEmitter.subscribe(data => this.topics = data)
    this.filterForm = new FormGroup({
      "topics": new FormArray([])
    })
  }

  getControls() {
    return (<FormArray>this.filterForm.get('topics')).getRawValue();
  }

  onSearch() {
    console.log('filter value',this.filterForm.value)
    this.questionService.getQuestionByFilters(this.filterForm.value)
  }

  onSubmit(form) {
    this.formData = this.filterForm.value;
    this.resetFormValue()
    console.log(this.formData)
    form.reset()
  }

  onAddTopic(input, index) {
    this.modalService.addTopic(input,index,this.filterForm,this.topics)
    console.log('question-filter-input',input)

  }

  onRemoveTopic(index) {
    (<FormArray>this.filterForm.controls['topics']).removeAt(index)

  }

  onShowCheckboxes() {
    this.modalService.showCheckboxes('filter-component-checkboxes')
  }

  resetFormValue () {
    let arr = (<FormArray>this.filterForm.controls['topics']);
    document.querySelectorAll('.list-item').forEach(el => el.remove());
    document.getElementById("filter-component-checkboxes").style.display = 'none';
    this.expanded = false;
    arr.clear();
  }



}
