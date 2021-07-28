import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

export interface question {
  _id: string
  title: string,
  type: string,
  topics: string[],
  description: string,
  maxLength: number
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService  {
  availableTopics = ['front-end', 'back-end'];
  topicsEmitter = new EventEmitter<any>();
  changedQuestion = new Subject<question>();
  private questionListSubject = new BehaviorSubject<question[]>([]);
  public questionList$ = this.questionListSubject.asObservable();
  isSorted = false;

  addQuestionUrl = 'http://localhost:3000/api/question';
  allAvailableTopicsUrl = 'http://localhost:3000/api/question/topics';
  QuestionByFilterUrl = 'http://localhost:3000/api/question/filtered';
  editQuestionUrl = 'http://localhost:3000/api/question/edit';
  deleteQuestionUrl = 'http://localhost:3000/api/question/delete';
  constructor(private http: HttpClient) {
  }


  addNewQuestion(question: question) {
   return this.http.post<any>(this.addQuestionUrl, {question: question, email: 'vasilishin08@gmail.com'})
  }

  getAllTopics() {
    this.http.get<any>(this.allAvailableTopicsUrl).subscribe(data => {
      console.log('topics', data)
      this.availableTopics = data
      this.topicsEmitter.emit(this.availableTopics)
    })
  }

  getQuestionByFilters(value = []) {
    console.log('filtered value',value)
    return this.http.post<question[]>(this.QuestionByFilterUrl, value)
      .pipe(
        tap(data => {
          console.log(data)
          console.log('wtf')
          this.questionListSubject.next(data)
        })
      )
  }

  getQuestionById(id: string) {
    const questionList = this.questionListSubject.value
    let question = questionList.find(el => {
      if (el._id === id) {
        return el
      }
    })
    return question

  }

  editQuestion(editedQuestion: question, id) {
    console.log('edited question',editedQuestion)
    this.http.put(this.editQuestionUrl, {question: editedQuestion, _id: id})
      .subscribe(data => {
        console.log('data from request', data['question'])
        console.log('data from request id', data['id'])
        this.changedQuestion.next(data['question'])

      })
  }

  deleteQuestion(id: string) {
    this.http.post(this.deleteQuestionUrl, {_id: id}).subscribe((data: question[]) => {
      this.questionListSubject.next(data)
    })
  }

  updateQuestionList(question: question) {
    console.log('question from service', question)
    this.questionListSubject.next([...this.questionListSubject.value, question])
  }

  sortType(type) {
    const questionList = this.questionListSubject.value
    if (type === 'time' && this.isSorted !== true) {
      this.isSorted = true;
      questionList.sort(this.sortByTimeASC);
      this.questionListSubject.next(questionList)
    } else if (this.isSorted) {
      this.isSorted = false;
      questionList.sort(this.sortByTimeDESC);
      this.questionListSubject.next(questionList)
    }

  }


  sortByTimeASC(a,b) {
    return a.maxLength - b.maxLength;
  }

  sortByTimeDESC(a,b) {
    return b.maxLength - a.maxLength;
  }

}
