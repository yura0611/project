import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';


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
  constructor(private shared:SharedService) {
   
    

  }

  ngOnInit(): void {
    this.message =  this.shared.getMessage()
    this.text = this.message['description']; 
  }

  



}
