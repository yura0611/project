import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacanciesCreateComponent } from './vacancies/vacancies-create/vacancies-create.component';
import { VacanciesEditComponent } from './vacancies/vacancies-edit/vacancies-edit.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import {QuestionsComponent} from "./questions-library/questions/questions.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'home', component: HomePageComponent},
  {path:'questions',component: QuestionsComponent},
  {path: 'vacancies', component: VacanciesComponent},
  {path: 'vacancies-create',component: VacanciesCreateComponent},
  {path:'vacancies-edit',component: VacanciesEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
