import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesCreateComponent } from './header/vacancies/vacancies-create/vacancies-create.component';
import { VacanciesEditComponent } from './header/vacancies/vacancies-edit/vacancies-edit.component';
import { VacanciesComponent } from './header/vacancies/vacancies.component';
import {SignInComponent} from "./sign-in/sign-in.component";

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'vacancies', component: VacanciesComponent},
  {path: 'vacancies-create',component: VacanciesCreateComponent},
  {path:'vacancies-edit',component: VacanciesEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
