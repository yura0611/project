import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {QuestionsComponent} from "../questions-library/questions/questions.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navLinks = [
    { path: '/vacancies', label: 'Vacancies' },
    { path: 'questions', label: 'Questions', component: QuestionsComponent },
    { path: '/system-settings', label: 'System Settings' },
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
