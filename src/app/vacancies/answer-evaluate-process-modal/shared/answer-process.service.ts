import {Injectable, EventEmitter} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {tap} from "rxjs/operators";
import {IEvaluationProcess} from "../../../app-shared/interfaces/IEvaluationProcess";



@Injectable({providedIn: 'root'})
export class AnswerProcessService {
  public disabled = false;
  disabledValueEmitter = new EventEmitter();
  private oneAnswerSubject: BehaviorSubject<any> = new BehaviorSubject({})
  public oneAnswer$ = this.oneAnswerSubject.asObservable();
  private answerListSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  public answerList$ = this.answerListSubject.asObservable();
  private questionListSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public questionList$ = this.questionListSubject.asObservable();
  private currentQuestionSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public currentQuestion$ = this.currentQuestionSubject.asObservable();
  private currentAnswerSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public currentAnswer$ = this.currentAnswerSubject.asObservable();

  constructor(private dialog: MatDialog, private http: HttpClient) {
  }



  openModal(component) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '760px';
    this.dialog.open(component, modalConfig)
  }
  onClose() {
    this.dialog.closeAll();
  }

  getVacancy(id) {
    return this.http.get<IEvaluationProcess>(`${environment.API_URL}vacancy/evaluations/${id}`).pipe(
      tap(data => {
        this.answerListSubject.next(data.answers)
        this.questionListSubject.next(data.vacancy.questions)
        this.currentQuestionSubject.next(data.vacancy.questions[0])
        this.currentAnswerSubject.next(data.answers[0])
      })
    )
  }

  public updateAnswer(answer) {
    const answerList = this.answerListSubject.value;
    const currentQuestionId = this.currentQuestionSubject.value?.questionId;
    const answerIndex = answerList.findIndex(el => el.questionId === currentQuestionId);
    const currentAnswer = answerList.find(el => el.questionId === currentQuestionId);
    const updatedAnswer = {
      ...currentAnswer,
      currentQuestionId,
      answer
    };
    answerList.map(el => {
      if (el.question === currentQuestionId) {
        el.answer = answer;
      }
    })

    this.oneAnswerSubject.next(updatedAnswer)
    this.answerListSubject.next(answerList);
  }

  nextQuestion() {
    const questionList = [...this.questionListSubject.value];
    const answerList = [...this.answerListSubject.value];
    const currentQuestionId = '' + this.currentQuestionSubject.value?.questionId;
    const index = questionList.findIndex(el => el.questionId === currentQuestionId);
    if (questionList.length - 1 <= index) {
      this.currentQuestionSubject.next(questionList[0])
      this.currentAnswerSubject.next(answerList[0])
    } else {
      this.currentQuestionSubject.next(questionList[index + 1])
      this.currentAnswerSubject.next(answerList[index + 1])
    }

  }

  previousQuestion() {
    const questionList = [...this.questionListSubject.value];
    const answerList = [...this.answerListSubject.value];
    const currentQuestionId = '' + this.currentQuestionSubject.value?.questionId;
    const index = questionList.findIndex(el => el.questionId === currentQuestionId);
    if (index === 0) {
      this.currentQuestionSubject.next(questionList[questionList.length - 1])
      this.currentAnswerSubject.next(answerList[answerList.length - 1])
    } else {
      this.currentQuestionSubject.next(questionList[index - 1])
      this.currentAnswerSubject.next(answerList[index - 1])
    }
  }

  sendAnswer(evaluationId) {
    let answerFromReq;
    this.oneAnswer$.subscribe(data => answerFromReq = data)
    this.http.put(`${environment.API_URL}vacancy/update-answer/${evaluationId}`, {answerFromReq})
      .subscribe()

  }

  sendLastAnswer(evaluationId, answerFromReq) {
    this.http.put(`${environment.API_URL}vacancy/submit-answers/${evaluationId}`, {answerFromReq})
      .subscribe()
  }

}
