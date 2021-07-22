import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GoogleAuthButtonComponent } from './sign-in/google-auth-button/google-auth-button.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material";
import { QuestionsFilterComponent } from './questions-library/questions-filter/questions-filter.component';
import { QuestionsListComponent } from './questions-library/questions-list/questions-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import { QuestionViewModalComponent } from './questions-library/question-view-modal/question-view-modal.component';
import { QuestionEditModalComponent } from './questions-library/question-edit-modal/question-edit-modal.component';
import { QuestionNewModalComponent } from './questions-library/question-new-modal/question-new-modal.component';
import { QuestionsComponent } from './questions-library/questions/questions.component';
import {RouterModule} from "@angular/router";
import {QuestionsLibraryModule} from "./questions-library/shared/questions-library.module";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GoogleAuthButtonComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    QuestionsLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
