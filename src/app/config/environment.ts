import { Injectable } from '@angular/core';
@Injectable()
export class Environments {
  public readonly API_GET_VACANCIES: string = 'http://localhost:3000/api/vacancy';
  public readonly API_DELETE_VACANCY: string = 'http://localhost:3000/api/vacancy/delete/';
  public readonly API_EDIT_VACANCY_STATUS: string = 'http://localhost:3000/api/vacancy/status';
  public readonly  API_EDIT_VACANCY: string =  'http://localhost:3000/api/vacancy/edit';

  }
