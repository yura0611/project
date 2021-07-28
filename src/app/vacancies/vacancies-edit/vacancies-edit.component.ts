import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-vacancies-edit',
  templateUrl: './vacancies-edit.component.html',
  styleUrls: ['./vacancies-edit.component.scss']
})
export class VacanciesEditComponent implements OnInit {
  message: string;
  name = 'Angular';
  showMore = false;
  text = '';
  constructor() {



  }

  ngOnInit(): void {
    this.text = this.message['description'];
  }





}
