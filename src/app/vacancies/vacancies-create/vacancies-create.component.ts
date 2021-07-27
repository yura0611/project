import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {QuestionService} from "../../questions-library/shared/question.service";

@Component({
  selector: 'app-vacancies-create',
  templateUrl: './vacancies-create.component.html',
  styleUrls: ['./vacancies-create.component.scss']
})
export class VacanciesCreateComponent implements OnInit {
  vacanciesForm: FormGroup;
  allQuestions$ = this.questionService.questionList$;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.vacanciesForm = this.formBuilder.group({
      title: [null, [Validators.maxLength(200), Validators.required]],
      type: [null, [Validators.required]],
      description: [null, [Validators.required, Validators.maxLength(800)]],
      link:[null],
      status:['active']
    });
    this.questionService.getQuestionByFilters().subscribe()
  }

  saveForm() {
    if (!this.vacanciesForm.valid) {
      return;
    }
    console.log(this.vacanciesForm.value);
    this.router.navigate(['/vacancies']);

  }

}
