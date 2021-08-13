import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {GoogleAuthButtonComponent} from './sign-in/google-auth-button/google-auth-button.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionsLibraryModule} from './questions-library/shared/questions-library.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {HomePageComponent} from './home-page/home-page.component';
import {TokenInterceptor} from './app.interceptor';
import {CommonModule} from '@angular/common';
import {VacanciesListComponent} from './home-page/vacancies-list/vacancies-list.component';
import {Constants} from './constants/constants';
import {ConvertTimePipe} from "./app-shared/convertTime.pipe";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatBadgeModule} from "@angular/material/badge";
import {AnswerPageComponent} from './answer-page/answer-page.component';
import {AnswerModalComponent} from './answer-page/answer-modal/answer-modal.component';
import {RedirectToAdministratorComponent} from './redirect-to-administrator/redirect-to-administrator.component';
import {VacanciesModule} from "./vacancies/shared/vacancies.module";
import { CongratulationsPageComponent } from './answer-page/app-shared/congratulations-page/congratulations-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GoogleAuthButtonComponent,
    HeaderComponent,
    HomePageComponent,
    VacanciesListComponent,
    ConvertTimePipe,
    AnswerPageComponent,
    AnswerModalComponent,
    RedirectToAdministratorComponent,
    CongratulationsPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    QuestionsLibraryModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatBadgeModule,
    VacanciesModule,
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    Constants,
  ],
    exports: [
        ConvertTimePipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
