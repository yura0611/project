import {Component, Inject, OnInit} from '@angular/core';
import {AnswerPageService} from "../shared/answerPage.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IQuestion} from "../../app-shared/interfaces/IQuestion";

@Component({
  selector: 'app-answer-modal',
  templateUrl: './answer-modal.component.html',
  styleUrls: ['./answer-modal.component.scss']
})
export class AnswerModalComponent implements OnInit {
  private mark = 10;
  marks = [];
  question
  answer
  allQuestions

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                question: IQuestion,
                allQuestions: IQuestion[],
                evaluationId: string},
              private answerPage: AnswerPageService) {
  }

  ngOnInit() {
    this.setScaleOfMarks()
    this.question = this.data.question
    this.allQuestions = this.data.allQuestions
  }

  closeModal() {
    this.answerPage.onClose()
  }

  currentNumberOfQuestion() {
    const allQuestions = this.allQuestions;
    const currentQuestion = this.question;
    const index = allQuestions.findIndex(el => el.question._id === currentQuestion._id);
    const currentAnswer = allQuestions[index].answer
    this.answer = currentAnswer
    return index + 1;
  }

  nextQuestion() {
    const currentQuestionId = this.question._id;
    const allQuestions = this.allQuestions;
    const index = allQuestions.findIndex(el => el.question._id === currentQuestionId);
    const currentAnswer = allQuestions[index].answer
    this.answer = currentAnswer
    if (allQuestions.length - 1 <= index) {
      this.question = allQuestions[0].question

    } else {
      this.question = allQuestions[index + 1].question

    }
  }

  previousQuestion() {
    const currentQuestionId = this.question._id;
    const allQuestions = this.allQuestions;
    const index = allQuestions.findIndex(el => el.question._id === currentQuestionId);
    const currentAnswer = allQuestions[index].answer
    this.answer = currentAnswer
    if (index === 0) {
      this.question = allQuestions[allQuestions.length - 1].question

    } else {
      this.question = allQuestions[index - 1].question
    }
  }

  setScaleOfMarks() {
    for (let i = 0; i <= this.mark; i++) {
      this.marks.push(i)
    }
  }
  setMark(mark, questionId) {
    this.answerPage.setScore(questionId, mark, this.data.evaluationId)
  }


}
