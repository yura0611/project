import {Injectable, EventEmitter, Input} from '@angular/core';
import {Subject} from "rxjs";

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
export class QuestionService {
  specificQuestionID: number;
  availableTopics = ['js', 'node', 'angular', 'java', 'ruby', 'react', 'vue'];
  questionEmitter = new EventEmitter<question[]>()
  changedQuestion = new Subject<question[]>()
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


  constructor() {
  }

  addNewQuestion(question: question) {
    this.questionList.push(question)
    this.questionEmitter.emit(this.questionList.slice())
  }

  getAllQuestions() {
    return this.questionList.slice();
  }

  getQuestionById(id: number) {
    this.specificQuestionID = id
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
