import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {QuestionsComponent} from "./questions-library/questions/questions.component";

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'questions', component: QuestionsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
