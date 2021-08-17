import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../questions-library/shared/question.service';
import {VacanciesCreateService} from "../shared/vacancies-create.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {VacanciesViewModalComponent} from "./vacancies-view-modal/vacancies-view-modal.component";
import {options} from "../../app-shared/inputsOptions";
import {IQuestion} from "../../app-shared/interfaces/IQuestion";
import {patterns} from "../../app-shared/regexPatterns/patterns";
import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../constants/constants";
import {ModalService} from "../../questions-library/shared/modals.service";
import {QuestionModalFormComponent} from "../../questions-library/question-modal-form/question-modal-form.component";

@Component({
  selector: 'app-vacancies-create',
  templateUrl: './vacancies-create.component.html',
  styleUrls: ['./vacancies-create.component.scss']
})
export class VacanciesCreateComponent implements OnInit {
  @ViewChildren('element') checkbox: QueryList<ElementRef>;
  inputSearchValue: any = '';
  searchMode = false;
  totalTime: number = 0;
  allQuestions: IQuestion[];
  vacanciesForm: FormGroup;
  titleLength = options.titleLength;
  descriptionLength = options.descriptionLength;
  limitOfQuestionExceed = false;

  constructor(public dialog: MatDialog,
              public questionService: QuestionService,
              public vacanciesCreateService: VacanciesCreateService,
              private router: Router,
              private route: ActivatedRoute,
              private constants: Constants,
              private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.questionService.getAllTopics()
    this.vacanciesCreateService.getAllQuestions().subscribe(data => this.allQuestions = data)
    this.questionService.questionList$.subscribe(data => this.allQuestions = data)

    this.vacanciesForm = new FormGroup({
      'title': new FormControl(null,
        [Validators.required, Validators.maxLength(200), Validators.pattern(patterns.regexOnlyAlphaNumeric)]),
      'type': new FormControl('', Validators.required),
      'description': new FormControl(null,
        [Validators.required, Validators.maxLength(800), Validators.pattern(patterns.regexOnlyAlphaNumeric)]),
      'questions': new FormArray([], Validators.required)
    })
  }


  get getQuestionsArray() {
    return (<FormArray>this.vacanciesForm.get('questions')).getRawValue()
  }

  saveForm() {
    if (!this.vacanciesForm.valid) {
      return;
    }
    const questions = this.vacanciesForm.value.questions;
    const newVacancy = {
      title: this.vacanciesForm.value.title,
      type: this.vacanciesForm.value.type,
      description: this.vacanciesForm.value.description,
    }
    const questionsId = [];
    questions.map(el => questionsId.push(el._id))
    this.vacanciesCreateService.createVacancy(questionsId, newVacancy).subscribe(() => {
      this.router.navigate(['/vacancies'], {relativeTo: this.route})
    })


  }

  onAddQuestion(question, input) {
    if (!input.checked) {
      this.removeQuestion(this.vacanciesForm, input, question)
    } else if ((this.vacanciesForm.get('questions').value.length > 19) ||
      (this.vacanciesForm.get('questions').value.indexOf(input.value) !== -1)) {
      this.limitOfQuestionExceed = true;
      input.checked = false;
      return;
    } else {
      this.totalTime += question.maxLength;
      (<FormArray>this.vacanciesForm.get('questions')).push(new FormControl(question));
    }

  }

  removeQuestion(modal, input, question) {
    this.totalTime -= question.maxLength
    let questions = (<FormArray>modal.get('questions'))
    questions.removeAt(questions.value.findIndex(question => {
      if (question.title === input.value && question._id === input.id) {
        return question
      }
    }))

  }

  onDelete(index, question) {
    let inputs = []
    this.checkbox.toArray().filter(el => el.nativeElement).map(el => inputs.push(el))
    for (let i = 0; i <= inputs.length - 1; i++) {
      if (inputs[i].nativeElement.name === question.title &&
        inputs[i].nativeElement.id === question._id) {
        inputs[i].nativeElement.checked = false;
      }
    }
    this.totalTime -= question.maxLength;
    this.limitOfQuestionExceed = false;
    (<FormArray>this.vacanciesForm.controls['questions']).removeAt(index)
  }

  openViewQuestionModal(question: IQuestion) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = this.constants.modalWidth.xs;
    modalConfig.height = this.constants.modalHeight.l;
    modalConfig.data = question;

    this.dialog.open(VacanciesViewModalComponent, modalConfig)
  }

  onOpenModal(id, editMode) {
    this.modalService.openModal(id, editMode, QuestionModalFormComponent)
  }

}
