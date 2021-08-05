import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {IQuestion, QuestionService} from '../shared/question.service';

@Component({
  selector: 'app-questions-filter',
  templateUrl: './questions-filter.component.html',
  styleUrls: ['./questions-filter.component.scss']
})
export class QuestionsFilterComponent implements OnInit {

  @ViewChildren('checkBox') checkBoxInput: QueryList<ElementRef>;
  @ViewChild('expandSelect') select: ElementRef;
  @ViewChild('questionBlock') questionBlock: ElementRef;
  topics = this.questionService.availableTopics;
  filterForm: FormGroup;
  formData: IQuestion;
  modalsMode;
  constructor(private questionService: QuestionService) {

  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      'topics': new FormArray([])
    });
  }

  onSearch() {
    this.questionService.getQuestionByFilters(this.filterForm.value).subscribe();

  }

  onSubmit() {
    this.formData = this.filterForm.value;

  }

}
