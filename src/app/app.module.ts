import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GoogleAuthButtonComponent } from './sign-in/google-auth-button/google-auth-button.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material";
import { VacanciesComponent } from './vacancies/vacancies.component';
import { VacanciesCreateComponent } from './vacancies/vacancies-create/vacancies-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VacanciesTableComponent } from './vacancies/vacancies-table/vacancies-table.component';
import { VacanciesEditComponent } from './vacancies/vacancies-edit/vacancies-edit.component';
import {QuestionsLibraryModule} from "./questions-library/shared/questions-library.module";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { HomePageComponent } from './home-page/home-page.component';
import { TokenInterceptor } from './app.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GoogleAuthButtonComponent,
    HeaderComponent,
    VacanciesComponent,
    VacanciesCreateComponent,
    VacanciesTableComponent,
    VacanciesEditComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    QuestionsLibraryModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
