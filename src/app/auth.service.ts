import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BehaviorSubject, Subject} from "rxjs";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private isLoggedInSubject = new BehaviorSubject(false)
  login = new Subject()

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
    return this.http.post<any>(`${environment.API_URL}user/login`, {token: userData.id_token})
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
