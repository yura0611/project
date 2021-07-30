import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {question, QuestionService} from '../shared/question.service';
import {ModalService} from '../shared/modals.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss']
})
export class QuestionsFilterComponent implements OnInit {

  @ViewChild('element') checkBoxInput: ElementRef;
  topics: string[];
  filterForm: FormGroup;
  expanded = false;
  formData: question;

  constructor(private questionService: QuestionService,
              private modalService: ModalService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
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
    this.questionService.getQuestionByFilters(this.filterForm.value).subscribe();

  }

  onSubmit(form) {
    this.formData = this.filterForm.value;
    this.resetFormValue();
    form.reset();
  }

  onAddTopic(input, index) {
    this.modalService.addTopic(input, index, this.filterForm, this.topics);

  }

  onRemoveTopic(index) {
    (<FormArray> this.filterForm.controls['topics']).removeAt(index);

  }

  onShowCheckboxes() {
    this.modalService.showCheckboxes('filter-component-checkboxes');
  }

  resetFormValue() {
    let arr = (<FormArray> this.filterForm.controls['topics']);
    document.querySelectorAll('.list-item').forEach(el => el.remove());
    document.getElementById('filter-component-checkboxes').style.display = 'none';
    this.expanded = false;
    arr.clear();
  }


}
