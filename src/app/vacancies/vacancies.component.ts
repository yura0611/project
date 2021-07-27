import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate(['/vacancies-create'])
  }
}
