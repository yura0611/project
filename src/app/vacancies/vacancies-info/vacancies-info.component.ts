import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-vacancies-info',
  templateUrl: './vacancies-info.component.html',
  styleUrls: ['./vacancies-info.component.scss']
})
export class VacanciesInfoComponent implements OnInit {
  message: string;
  name = 'Angular';
  showMore = false;
  text = '';
  percentage = 0;
  completed = 0;
  applications = 0;
  constructor(private shared:SharedService) {
   
    

  }

  ngOnInit(): void {
    this.message =  this.shared.getMessage()
    this.text = this.message['description']; 
  }

  



}
