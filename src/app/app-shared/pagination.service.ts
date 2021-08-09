import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class PaginationService {
  itemSubject = new BehaviorSubject(0)
  currentItem = 0;

  next(currentQuestion) {
    if (this.currentItem >= currentQuestion.length - 1) {
      this.currentItem = 0
      this.itemSubject.next(this.currentItem)
    } else {
      this.currentItem++
      this.itemSubject.next(this.currentItem)
    }

  }

  previous(currentQuestion) {
    if (this.currentItem < 1) {
      this.currentItem = currentQuestion.length - 1
     this.itemSubject.next(this.currentItem)
    } else {
      this.currentItem--
      this.itemSubject.next(this.currentItem)
    }

  }

}
