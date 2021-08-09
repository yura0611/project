import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacanciesCreateComponent} from './vacancies/vacancies-create/vacancies-create.component';
import {VacanciesInfoComponent} from './vacancies/vacancies-info/vacancies-info.component';
import {VacanciesComponent} from './vacancies/vacancies.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {QuestionsComponent} from './questions-library/questions/questions.component';
import {HomePageComponent} from './home-page/home-page.component';
import {VacanciesEditComponent} from './vacancies/vacancies-edit/vacancies-edit.component';
import {AnswerEvaluateProcessModalComponent} from "./vacancies/answer-evaluate-process-modal/answer-evaluate-process-modal.component";
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'home', canActivate:[AuthGuard], component: HomePageComponent},
  {path: 'questions', canActivate:[AuthGuard], component: QuestionsComponent},
  {path: 'vacancies', canActivate:[AuthGuard], component: VacanciesComponent},
  {path: 'vacancies-create', canActivate:[AuthGuard], component: VacanciesCreateComponent},
  {path: 'vacancy-info/:id', canActivate:[AuthGuard], component: VacanciesInfoComponent},
  {path: 'vacancy-edit/:id', canActivate:[AuthGuard], component: VacanciesEditComponent},
  {path: 'vacancy-info', canActivate:[AuthGuard], component: VacanciesInfoComponent},
  {path: 'vacancy-edit', canActivate:[AuthGuard], component: VacanciesEditComponent},
  {path: 'evaluate', canActivate:[AuthGuard], component: AnswerEvaluateProcessModalComponent},
  {path: 'system-settings', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
