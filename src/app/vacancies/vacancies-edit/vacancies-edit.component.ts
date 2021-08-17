import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VacanciesService} from '../shared/vacancies.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-vacancies-edit',
  templateUrl: './vacancies-edit.component.html',
  styleUrls: ['./vacancies-edit.component.scss']
})
export class VacanciesEditComponent implements OnInit {
  id;
  title;
  type;
  description;
  questions;
  totalTime = 0;
  vacancy;
  editedVacancy;
  numOfQuestions = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vacanciesService: VacanciesService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.vacanciesService.getVacancy(this.id).pipe(
      tap(vacancy => {
        this.title = vacancy.title;
        this.type = vacancy.type;
        this.description = vacancy.description;
        this.questions = vacancy.questions;
        this.vacancy = vacancy;
        this.questions.forEach(el => {
          this.totalTime += el.maxLength;
          this.numOfQuestions += 1;
        });
        return '';
      })
    ).subscribe();

  }

  vacancyEdit(): void {
    this.editedVacancy = Object.assign({}, this.vacancy, {
      title: this.title,
      type: this.type,
      description: this.description,
      questions: this.questions
    });
    this.vacanciesService.editVacancy(this.editedVacancy).subscribe();
    this.router.navigate([`/vacancy-info/${this.id}`]);


  }
}
