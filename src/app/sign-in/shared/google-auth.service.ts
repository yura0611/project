import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth.service';
import {environment} from "../../../environments/environment";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AnswerEvaluateProcessModalComponent} from "../../vacancies/answer-evaluate-process-modal/answer-evaluate-process-modal.component";

export type userDataType = {
  userProfileData: {}
  userAuthData: {}
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  public gapiSetup = false;
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;
  public userData: userDataType;

  async initGoogleAuth(): Promise<void> {

    const payload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return payload.then(async () => {
      await gapi.auth2
        .init({client_id: `${environment.GOOGLE_CLIENT_ID}`})
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<any> {
    try {
      if (!this.gapiSetup) {
        await this.initGoogleAuth();
      }
      const user = await this.authInstance.signIn({prompt: 'select_account', ux_mode: 'popup'})
      this.user = user
      this.userData = {
        userAuthData: user.getAuthResponse(),
        userProfileData: user.getBasicProfile()
      };
      localStorage.setItem('user-email', user.getBasicProfile().getEmail())
      console.log(JSON.stringify(localStorage.getItem('user-email')));
      console.log(user.getBasicProfile().getEmail())
      this.openModal()
      return this.authService.sendToken(this.userData.userAuthData).subscribe()
    } catch (e) {
    //  TODO: Implement custom error alert(error comes from google api, for example show snackbar)
    }
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return this.authInstance.isSignedIn.get();
  }
  openModal() {
    const modalConfig = new MatDialogConfig();
    modalConfig.autoFocus = false;
    modalConfig.width = '760px';
    modalConfig.height = '850px';
    this.dialog.open(AnswerEvaluateProcessModalComponent, modalConfig)
    // console.log(this.allQuestions)
  }

}
