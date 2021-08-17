import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Constants} from "../../constants/constants";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IEvaluationProcess} from "../../app-shared/interfaces/IEvaluationProcess";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class AnswerPageService {
  scoreUpdateSubject = new Subject()
  constructor(private dialog: MatDialog,
              private constants: Constants,
              private router: Router,
              private http: HttpClient,) {
  }

  openModal(component, question, questions, evaluationId) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = this.constants.modalWidth.m;
    modalConfig.data = {question: question, allQuestions: questions, evaluationId: evaluationId};
    return this.dialog.open(component, modalConfig)
  }

  onClose() {
    this.dialog.closeAll()
  }

  getEvaluation(id) {
    return this.http.get<IEvaluationProcess>(`${environment.API_URL}vacancy/evaluation/${id}`)
  }

  setScore(questionId, mark, evaluationId) {
    return this.http.put(`${environment.API_URL}vacancy/evaluation/${evaluationId}/score`, {evaluationScore: {
        questionId: questionId,
        score: mark
      }})
      .subscribe()
  }
}
