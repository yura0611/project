import {NgModule} from "@angular/core";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {SelectedTopicsListComponent} from "../../app-shared/selected-topics-list/selected-topics-list.component";
import {QuestionModalFormComponent} from "../question-modal-form/question-modal-form.component";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    QuestionViewModalComponent,
    SelectedTopicsListComponent,
    QuestionModalFormComponent
  ],
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  exports: [
    QuestionViewModalComponent,
    SelectedTopicsListComponent,
    QuestionModalFormComponent
  ]
})
export class ModalsModule {

}
