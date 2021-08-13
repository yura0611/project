import {NgModule} from "@angular/core";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {SelectedTopicsListComponent} from "../../app-shared/selected-topics-list/selected-topics-list.component";
import {QuestionModalFormComponent} from "../question-modal-form/question-modal-form.component";


@NgModule({
  declarations: [
    QuestionViewModalComponent,
    SelectedTopicsListComponent,
    QuestionModalFormComponent
  ],
    imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  exports: [
    QuestionViewModalComponent,
    SelectedTopicsListComponent,
    QuestionModalFormComponent
  ]
})
export class ModalsModule {

}
