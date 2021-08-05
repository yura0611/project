import {NgModule} from "@angular/core";
import {QuestionsComponent} from "../questions/questions.component";
import {QuestionsListComponent} from "../questions-list/questions-list.component";
import {QuestionsFilterComponent} from "../questions-filter/questions-filter.component";
import {ModalsModule} from "./modals.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [QuestionsComponent,QuestionsListComponent,QuestionsFilterComponent, QuestionsListComponent],
  imports: [ModalsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatButtonModule],
  exports: [QuestionsComponent,QuestionsListComponent,QuestionsFilterComponent, QuestionsListComponent]
})
export class QuestionsLibraryModule {

}
