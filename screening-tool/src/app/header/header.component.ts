import { Component, OnInit } from '@angular/core';
import {QuestionsComponent} from "../questions-library/questions/questions.component";
import {VacanciesComponent} from "../vacancies/vacancies.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  navLinks = [
    { path: 'vacancies', label: 'Vacancies', component: VacanciesComponent },
    { path: 'questions', label: 'Questions', component: QuestionsComponent },
    { path: 'system-settings', label: 'System Settings' },
  ];


}
