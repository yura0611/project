import {environment} from "../../../environments/environment";
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {IQuestion} from "../../app-shared/interfaces/IQuestions";



@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  availableTopics = [];
  private availableTopicsSubject = new BehaviorSubject<string[]>([]);
  public availableTopics$ = this.availableTopicsSubject.asObservable();
  changedQuestion = new Subject<IQuestion>();
  private questionListSubject = new BehaviorSubject<IQuestion[]>([]);
  public questionList$ = this.questionListSubject.asObservable();
  isSorted = false;

  constructor(private http: HttpClient) {
  }


  addNewQuestion(question: IQuestion) {
    return this.http.post<{email: string, question: IQuestion}>(`${environment.API_URL}question`, {question, email: 'vasilishin08@gmail.com'});
  }

  getAllTopics() {
    this.http.get<string[]>(`${environment.API_URL}question/topics`).subscribe(data => {
      this.availableTopics.push(...data)
      this.availableTopicsSubject.next(data)
    });
  }

  getQuestionByFilters(value = []) {
    return this.http.post<IQuestion[]>(`${environment.API_URL}question/filtered`, value)
      .pipe(
        tap(data => {
          this.questionListSubject.next(data);
        })
      );
  }

  getQuestionById(id: string) {
    const questionList = this.questionListSubject.value;
    return questionList.find(el => {
      if (el._id === id) {
        return el;
      }
    });

  }


  editQuestion(editedQuestion: IQuestion, id) {
    this.http.put(`${environment.API_URL}question/edit`, {question: editedQuestion, _id: id}).pipe(
      tap(data => {
        const editedQuestion = data['question'];
        const questionList = this.questionListSubject.value;
        const newQuestionList = questionList.map(question => {
          if (question._id === editedQuestion._id) {
            return editedQuestion;
          }
          return question
        })
        console.log(newQuestionList);
        this.questionListSubject.next(newQuestionList)
      })
    )

  }

  deleteQuestion(id: string) {
    this.http.post(`${environment.API_URL}question/delete`, {_id: id}).subscribe((data: IQuestion[]) => {
      this.questionListSubject.next(data);
    });
  }

  updateQuestionList(question: IQuestion) {
    this.questionListSubject.next([...this.questionListSubject.value, question]);
  }

  sortType(type) {
    const questionList = this.questionListSubject.value;
    if (type === 'time' && this.isSorted !== true) {
      this.isSorted = true;
      questionList.sort(this.sortByTimeASC);
      this.questionListSubject.next(questionList);
    } else if (this.isSorted) {
      this.isSorted = false;
      questionList.sort(this.sortByTimeDESC);
      this.questionListSubject.next(questionList);
    }

  }


  sortByTimeASC(a, b) {
    return a.maxLength - b.maxLength;
  }

  sortByTimeDESC(a, b) {
    return b.maxLength - a.maxLength;
  }

}
