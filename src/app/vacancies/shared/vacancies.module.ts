import {NgModule} from "@angular/core";
import {VacanciesCreateComponent} from "../vacancies-create/vacancies-create.component";
import {VacanciesTableComponent} from "../vacancies-table/vacancies-table.component";
import {VacanciesInfoComponent} from "../vacancies-info/vacancies-info.component";
import {VacanciesEditComponent} from "../vacancies-edit/vacancies-edit.component";
import {VacanciesComponent} from "../vacancies.component";
import {AnswerEvaluateProcessModalComponent} from "../answer-evaluate-process-modal/answer-evaluate-process-modal.component";
import {VacanciesViewModalComponent} from "../vacancies-create/vacancies-view-modal/vacancies-view-modal.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SetReviewerModalComponent} from "../vacancies-info/set-reviewer-modal/set-reviewer-modal.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {VacanciesInviteModalComponent} from "../vacancies-invite-modal/vacancies-invite-modal.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ApplicationsTableComponent} from "../vacancies-info/applications-table/applications-table.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {VacanciesService} from "./vacancies.service";
import {EvaluationService} from "./evaluation.service";
import {VacanciesCreateService} from "./vacancies-create.service";
import {VacancyTableService} from "./vacancy-table.service";
import {ModalsModule} from "../../questions-library/shared/modals.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    VacanciesCreateComponent,
    VacanciesTableComponent,
    VacanciesInfoComponent,
    VacanciesEditComponent,
    VacanciesComponent,
    AnswerEvaluateProcessModalComponent,
    VacanciesViewModalComponent,
    SetReviewerModalComponent,
    VacanciesInviteModalComponent,
    ApplicationsTableComponent,

  ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatSortModule,
        MatButtonModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ModalsModule,
        RouterModule,

    ],
  exports: [
    VacanciesTableComponent,
    VacanciesInfoComponent,
    VacanciesEditComponent,
    VacanciesComponent,
    AnswerEvaluateProcessModalComponent,
    VacanciesViewModalComponent,
    SetReviewerModalComponent,
    VacanciesInviteModalComponent,
    ApplicationsTableComponent,
  ],
  providers: [
    VacanciesService,
    EvaluationService,
    VacanciesCreateService,
    VacancyTableService
  ]
})
export class VacanciesModule {

}
