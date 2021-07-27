import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth.service";

export type userDataType = {
  userProfileData: {}
  userAuthData: {}
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private clientId = '575303630273-90569cp922fdrci95s7vrjre9isp9kec.apps.googleusercontent.com';
  public gapiSetup: boolean = false;
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;
  public userData: userDataType
  // public mainUserData: userDataType;


  async initGoogleAuth(): Promise<void> {

    const payload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return payload.then(async () => {
      await gapi.auth2
        .init({ client_id: this.clientId })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {

    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return new Promise(async () => {
      await this.authInstance.signIn({prompt: 'select_account', ux_mode: 'popup'}).then((user) => {
        console.log('user from google', user.getAuthResponse())
        this.user = user;
        this.userData = {
          userAuthData: user.getAuthResponse(),
          userProfileData: user.getBasicProfile()
        }
        this.authService.sendToken(this.userData.userAuthData)
        localStorage.setItem('user', JSON.stringify(this.userData.userAuthData['id_token']))
        console.log('user data', this.userData)
      }, error => this.error = error);
    })
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }


}
