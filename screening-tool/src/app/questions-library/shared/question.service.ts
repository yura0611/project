import {Injectable, EventEmitter, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface question {
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
  questionEmitter = new EventEmitter<question[]>()
  topicsEmitter = new EventEmitter<any>()
  changedQuestion = new Subject<question[]>()
  questionByFilters = new Subject<question[]>()
  questionList: question[] = [
    {
      title: 'Today was a greate day',
      type: 'video',
      topics: ['js', 'node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 145
    },
    {
      title: 'The best title',
      type: 'code',
      topics: ['js','node', 'angular'],
      description: '',
      maxLength: 12
    },
    {
      title: 'The best title 2',
      type: 'video',
      topics: ['js', 'node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 67
    },
    {
      title: 'The best title 3',
      type: 'text',
      topics: ['js', 'node', 'java'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 9
    },
    {
      title: 'The best title 4',
      type: 'text',
      topics: ['js','node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 12
    },
    {
      title: 'The best title 5',
      type: 'code',
      topics: ['js', 'node', 'angular'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 33
    },
    {
      title: 'The best title 6',
      type: 'video',
      topics: ['js', 'node', 'Go'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolor dolores, eius ex illo, incidunt maiores mollitia neque nisi non officia pariatur, repudiandae. Accusamus, accusantium debitis eius iste perferendis porro possimus reiciendis ullam. Aut dignissimos eaque eligendi, facere nostrum, odio officia quibusdam quos suscipit unde ut voluptates! Dolorem facere facilis laboriosam laborum nulla sit! Asperiores enim error pariatur repellendus sapiente?',
      maxLength: 44
    },
  ]
  isSorted = false;

  allQuestionUrl = 'http://localhost:3000/api/question'
  addQuestionUrl = 'http://localhost:3000/api/question'
  allAvailableTopicsUrl = 'http://localhost:3000/api/question/topics'
  QuestionByFilter = 'http://localhost:3000/api/question/filtered'
  constructor(private http: HttpClient) {
  }


  addNewQuestion(question: question) {
   return this.http.post(this.addQuestionUrl, {question: question, email: 'vasilishin08@gmail.com'})
  }

  getAllQuestions() {
     this.http.get<question[]>(this.allQuestionUrl).subscribe(data => {
       console.log('question', data)
       this.questionList = data
       this.questionEmitter.emit(this.questionList)
     })

  }

  getQuestionByFilters(value) {
    this.http.post(this.QuestionByFilter, value).subscribe((data: question[]) => {
      this.questionByFilters.next(data)
    })
  }

  getAllTopics() {
    this.http.get<any>(this.allAvailableTopicsUrl).subscribe(data => {
      console.log('topics', data)
      this.availableTopics = data
      this.topicsEmitter.emit(this.availableTopics)
    })
  }

  getQuestionById(id: number) {
    return this.questionList.slice()[id];
  }

  editQuestion(editedQuestion: question, index) {

    this.questionList[index] = editedQuestion;
    this.changedQuestion.next(this.questionList.slice())
  }

  sortType(type) {
    if (type === 'time' && this.isSorted !== true) {
      this.isSorted = true;
      this.questionList.sort(this.sortByTimeASC);
      this.questionEmitter.emit(this.questionList);
    } else if (this.isSorted) {
      this.isSorted = false;
      this.questionList.sort(this.sortByTimeDESC);
      this.questionEmitter.emit(this.questionList);
    }

  }


  sortByTimeASC(a,b) {
    return a.maxLength - b.maxLength;
  }

  sortByTimeDESC(a,b) {
    return b.maxLength - a.maxLength;
  }

}
