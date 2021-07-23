import {NgModule} from "@angular/core";
import {QuestionEditModalComponent} from "../question-edit-modal/question-edit-modal.component";
import {QuestionNewModalComponent} from "../question-new-modal/question-new-modal.component";
import {QuestionViewModalComponent} from "../question-view-modal/question-view-modal.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    QuestionEditModalComponent,
    QuestionNewModalComponent,
    QuestionViewModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    QuestionEditModalComponent,
    QuestionNewModalComponent,
    QuestionViewModalComponent
  ]
})
export class ModalsModule {

}
