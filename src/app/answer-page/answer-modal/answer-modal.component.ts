import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AnswerPageService} from "../shared/answerPage.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IQuestion} from "../../app-shared/interfaces/IQuestions";

@Component({
  selector: 'app-answer-modal',
  templateUrl: './answer-modal.component.html',
  styleUrls: ['./answer-modal.component.scss']
})
export class AnswerModalComponent implements OnInit {
  question
  allQuestions
  @ViewChild('answer') answer: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { question: IQuestion, allQuestions: IQuestion[] },
              private answerPage: AnswerPageService) {
  }

  ngOnInit() {
    this.question = this.data.question
    this.allQuestions = this.data.allQuestions
  }

  closeModal() {
    this.answerPage.onClose()
  }

  currentNumberOfQuestion() {
    const questionList = this.allQuestions;
    const currentQuestion = this.question;
    const index = questionList.findIndex(el => el.questionId === currentQuestion.questionId);
    return index + 1;
  }

  nextQuestion() {
    const currentQuestionId = this.question.questionId;
    const allQuestions = this.allQuestions;
    const index = allQuestions.findIndex(el => el.questionId === currentQuestionId);

    if (allQuestions.length - 1 <= index) {
      this.question = allQuestions[0]

    } else {
      this.question = allQuestions[index + 1]

    }
  }

  previousQuestion() {
    const currentQuestionId = this.question.questionId;
    const allQuestions = this.allQuestions;
    const index = allQuestions.findIndex(el => el.questionId === currentQuestionId);
    if (index === 0) {
      this.question = allQuestions[allQuestions.length - 1]
    } else {
      this.question = allQuestions[index - 1]
    }

  }


}
