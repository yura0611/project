import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  isLogged = false;
  private isLoggedInSubject = new BehaviorSubject(false)
  public isLoggedIn$ = this.isLoggedInSubject.asObservable()
  login = new Subject()
  loginUrl = 'http://localhost:3000/api/user/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,

  ) {
  }


  private setToken(token) {
    this.cookieService.deleteAll();

    this.login.next(true)
    this.isLoggedInSubject.next(true)
    this.cookieService.set(
      'auth-token',
      token);
    this.router.navigate(['/home'])

  }

  public sendToken(userData) {
    return this.http.post<any>(this.loginUrl, {token: userData.id_token})
      .pipe(
        map(resp => resp.token),
        tap(token => this.setToken((token))),
      )
  }
}

interface ISignInInfo {
  token: string;
  user: {
    role: 'USER' | 'ADMIN';
    isActive: boolean;
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}
