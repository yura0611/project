import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {GoogleAuthButtonComponent} from './sign-in/google-auth-button/google-auth-button.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material";
import {VacanciesComponent} from './vacancies/vacancies.component';
import {VacanciesCreateComponent} from './vacancies/vacancies-create/vacancies-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VacanciesTableComponent} from './vacancies/vacancies-table/vacancies-table.component';
import {VacanciesInfoComponent} from "./vacancies/vacancies-info/vacancies-info.component";
import {QuestionsLibraryModule} from "./questions-library/shared/questions-library.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {HomePageComponent} from './home-page/home-page.component';
import {ApplicationsTableComponent} from "./vacancies/vacancies-info/applications-table/applications-table.component";
import {VacanciesInviteModalComponent} from "./vacancies/vacancies-invite-modal/vacancies-invite-modal.component";
import {TokenInterceptor} from './app.interceptor';
import {VacanciesViewModalComponent} from './vacancies/vacancies-create/vacancies-view-modal/vacancies-view-modal.component';
import {CommonModule} from "@angular/common";
import {VacanciesListComponent} from './home-page/vacancies-list/vacancies-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GoogleAuthButtonComponent,
    HeaderComponent,
    VacanciesComponent,
    VacanciesCreateComponent,
    VacanciesTableComponent,
    VacanciesInfoComponent,
    HomePageComponent,
    ApplicationsTableComponent,
    VacanciesInviteModalComponent,
    VacanciesViewModalComponent,
    VacanciesListComponent,
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
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
