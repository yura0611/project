import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = 'http://localhost:3000/api/user/login';
  allQuestionUrl = 'http://localhost:3000/api/question'

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }


  sendToken(userData) {
    console.log(userData)
    console.log('user token', userData.id_token)
    return this.http.post(this.loginUrl,{"token": userData.id_token}).subscribe(data => {
      console.log('from back-end',data)
    //  TODO : we need to set token from back-end in cookies
    })
  }
}
