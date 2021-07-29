import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service"
import {catchError, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})



export class AuthService  {


  loginUrl = 'http://localhost:3000/api/user/login';
  allQuestionUrl = 'http://localhost:3000/api/question';


  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
    ) {
  }


  private setToken(token) {
    console.log(token)
    return this.cookieService.set(
      'auth-token',
      token)
  }

  public sendToken(userData) {
    console.log('in send token',userData)
    return this.http.post<any>(this.loginUrl,{"token": userData.id_token})
      .pipe(
        tap(resp => console.log(resp)),
        map(resp => resp.token),
        tap(token => this.setToken((token)))
      )
      .subscribe()
    

  }
}

interface ISignInInfo {
  token: string;
  user: {
    role: "USER" | "ADMIN";
    isActive: boolean;
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  }
}
