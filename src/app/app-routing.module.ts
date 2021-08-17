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
import {AnswerPageComponent} from "./answer-page/answer-page.component";
import {AuthGuard} from "./auth.guard";
import {RedirectToAdministratorComponent} from "./redirect-to-administrator/redirect-to-administrator.component";
import {CongratulationsPageComponent} from "./answer-page/app-shared/congratulations-page/congratulations-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: 'home', canActivate:[AuthGuard], component: HomePageComponent},
  {path: 'questions', canActivate:[AuthGuard], component: QuestionsComponent},
  {path: 'vacancies', canActivate:[AuthGuard], component: VacanciesComponent, children: [
      {path: 'create', canActivate:[AuthGuard], component: VacanciesCreateComponent},
      {path: ':id', canActivate:[AuthGuard], component: VacanciesInfoComponent}
    ]},

  {path: 'vacancy-edit/:id', canActivate:[AuthGuard], component: VacanciesEditComponent},
  {path: 'vacancy-info', canActivate:[AuthGuard], component: VacanciesInfoComponent},
  {path: 'vacancy-edit', canActivate:[AuthGuard], component: VacanciesEditComponent},
  {path: 'evaluation/:id', canActivate:[AuthGuard], component: AnswerEvaluateProcessModalComponent},
  {path: 'answer/:evaluationId', canActivate:[AuthGuard], component: AnswerPageComponent},
  {path: 'system-settings', canActivate:[AuthGuard], component: RedirectToAdministratorComponent},
  {path: 'congratulations', canActivate:[AuthGuard], component: CongratulationsPageComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
