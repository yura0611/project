import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AnswerModalService {
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

  getVacancy() {
    return this.http.get(`${environment.API_URL}vacancy/evaluation/610d185ef1087262637e42ff`)
  }

}
