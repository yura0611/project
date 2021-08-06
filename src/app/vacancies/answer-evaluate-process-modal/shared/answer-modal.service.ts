import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AnswerEvaluateProcessModalComponent} from "../answer-evaluate-process-modal.component";
import {environment} from "../../../../environments/environment";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {IEvaluationProcess} from "../../../app-shared/interfaces/IEvaluationProcess";

@Injectable({providedIn: 'root'})
export class AnswerModalService {
  currentQuestion = []
  constructor(private dialog: MatDialog, private http: HttpClient) {
  }


  openModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '760px';
    modalConfig.height = '850px';
    this.dialog.open(AnswerEvaluateProcessModalComponent, modalConfig)
  }

  getVacancy() {
    this.http.get(`${environment.API_URL}vacancy/evaluation/610d185ef1087262637e42ff`).pipe(
      tap((vacancyData: IEvaluationProcess) => this.currentQuestion = vacancyData.vacancy.questions)
    ).subscribe((data: IEvaluationProcess) => {
      console.log('from back',data)
    })
  }

}
