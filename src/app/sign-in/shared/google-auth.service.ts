import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {from, Subject} from 'rxjs';

export type userDataType = {
  userProfileData: {}
  userAuthData: {}
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  isLogin = false;
  loginSubject = new Subject();
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  private clientId = '575303630273-90569cp922fdrci95s7vrjre9isp9kec.apps.googleusercontent.com';
  public gapiSetup = false;
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;
  public userData: userDataType;

  // public mainUserData: userDataType;


  async initGoogleAuth(): Promise<void> {

    const payload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    return payload.then(async () => {
      await gapi.auth2
        .init({client_id: this.clientId})
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<any> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return from(this.authInstance.signIn({prompt: 'select_account', ux_mode: 'popup'}))
      .pipe(
        tap(user => this.user = user),
        tap(user => {
          this.userData = {
            userAuthData: user.getAuthResponse(),
            userProfileData: user.getBasicProfile()
          };
          this.isLogin = true;
          this.loginSubject.next(this.isLogin);

        }),
        switchMap(() => this.authService.sendToken(this.userData.userAuthData))
      )
      .subscribe(() => {

          this.router.navigate(['/questions'], {relativeTo: this.route});
        },
        error => this.error = error);
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }


}
