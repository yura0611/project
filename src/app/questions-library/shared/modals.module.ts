import {NgModule} from "@angular/core";
import {QuestionEditModalComponent} from "../question-edit-modal/question-edit-modal.component";
import {QuestionNewModalComponent} from "../question-new-modal/question-new-modal.component";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {SelectedTopicsListComponent} from "../../app-shared/selected-topics-list/selected-topics-list.component";
import {AppModule} from "../../app.module";
import {QuestionModalFormComponent} from "../question-modal-form/question-modal-form.component";


@NgModule({
  declarations: [
    QuestionEditModalComponent,
    QuestionNewModalComponent,
    QuestionViewModalComponent,
    SelectedTopicsListComponent,
    QuestionModalFormComponent
  ],
    imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  exports: [
    QuestionEditModalComponent,
    QuestionNewModalComponent,
    QuestionViewModalComponent,
    SelectedTopicsListComponent,
    QuestionModalFormComponent
  ]
})
export class ModalsModule {

}
