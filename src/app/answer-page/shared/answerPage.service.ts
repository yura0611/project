import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Constants} from "../../constants/constants";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {ICandidate} from "../../app-shared/interfaces/ICandidate";
import {IVacancy} from "../../app-shared/interfaces/IVacancy";

@Injectable({providedIn: 'root'})
export class AnswerPageService {
  private userAndVacancySubject = new BehaviorSubject<{user: ICandidate, vacancy: IVacancy}>({
    user: undefined,
    vacancy: undefined
  })
  public userAndVacancy$ = this.userAndVacancySubject.asObservable()

  constructor(private dialog: MatDialog,
              private constants: Constants,
              private router: Router) {
  }

  openModal(component, question, questions) {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = this.constants.modalWidth.m;
    modalConfig.data = {question: question, allQuestions: questions};
    this.dialog.open(component, modalConfig)
  }

  onClose() {
    this.dialog.closeAll()
  }

  getUserAndVacancy(user, vacancy) {
    this.userAndVacancySubject.next({user: user, vacancy: vacancy})
    this.router.navigate(['/answer'])

  }
}
