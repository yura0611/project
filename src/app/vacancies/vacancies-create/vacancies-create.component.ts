import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {question, QuestionService} from "../../questions-library/shared/question.service";
import {VacanciesCreateService} from "../shared/vacancies-create.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {VacanciesViewModalComponent} from "./vacancies-view-modal/vacancies-view-modal.component";
import {QuestionNewModalComponent} from "../../questions-library/question-new-modal/question-new-modal.component";

@Component({
  selector: 'app-vacancies-create',
  templateUrl: './vacancies-create.component.html',
  styleUrls: ['./vacancies-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VacanciesCreateComponent implements OnInit {
  inputSearchValue: any = '';
  searchMode = false;
  totalTime: number = 0;
  allQuestions: question[];
  vacanciesForm: FormGroup;
  isChecked = false;
  checked: boolean = false;

  constructor(public dialog: MatDialog,
              public questionService: QuestionService,
              public vacanciesService: VacanciesCreateService) { }

  ngOnInit() {
      this.questionService.getAllTopics()
      this.vacanciesService.getAllQuestions().subscribe(data => this.allQuestions = data)
      this.questionService.questionList$.subscribe(data => this.allQuestions = data)

    this.vacanciesForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'type': new FormControl('', Validators.required),
      'description': new FormControl(null, Validators.required),
      'link': new FormControl(null, Validators.required),
      'questions': new FormArray([], Validators.required)
    })
  }

  getQuestionsArray() {
    return (<FormArray>this.vacanciesForm.get('questions')).getRawValue()
  }

  saveForm() {
    if (!this.vacanciesForm.valid) {
      return;
    }
    console.log(this.vacanciesForm.value);

  }

  onAddQuestion(question, input) {
    console.log(input)
    if (!input.checked) {
      this.removeQuestion(this.vacanciesForm, input, question)
    } else if ((this.vacanciesForm.get('questions').value.length >= this.allQuestions.length) ||
      (this.vacanciesForm.get('questions').value.indexOf(input.value) !== -1)) {
      return;
    } else {
      this.totalTime += question.maxLength;
      (<FormArray>this.vacanciesForm.get('questions')).push(new FormControl(question));
    }

  }

  removeQuestion(modal, input, question) {
    this.totalTime -= question.maxLength
    let questions = (<FormArray>modal.get('questions'))
    questions.removeAt(questions.value.findIndex(question => question.title === input.value))

  }

  onDelete(index, question) {
    this.totalTime -= question.maxLength;
    let input = document.getElementsByTagName('input');
    for(let i = 0; i <= input.length - 1; i++) {
      if (input[i].getAttribute('name') === question.title &&
        input[i].getAttribute('id') === question._id) {
        input[i].checked = false;
      }
    }
    (<FormArray>this.vacanciesForm.controls['questions']).removeAt(index)
  }

  // This feature
  // onSearch() {
  //   let value = {topics: []};
  //   this.searchMode = !this.searchMode
  //   if (!this.inputSearchValue) {
  //     return;
  //   }
  //   value.topics.push(this.inputSearchValue)
  //   this.questionService.getQuestionByFilters(value.topics)
  //     .subscribe(data => this.allQuestions = data)
  //   console.log(value)
  // }


  openViewQuestionModal(question: question) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '496px';
    modalConfig.height = '850px';
    modalConfig.data = question;

    this.dialog.open(VacanciesViewModalComponent, modalConfig)
  }

  openCreateNewModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '496px';
    modalConfig.height = '850px';
    this.dialog.open(QuestionNewModalComponent, modalConfig)
  }









}
