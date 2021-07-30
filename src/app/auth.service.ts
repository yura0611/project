import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginEmitter = new Subject();
  loginUrl = 'http://localhost:3000/api/user/login';
  allQuestionUrl = 'http://localhost:3000/api/question'

  constructor(private http: HttpClient) {
  }


  sendToken(userData) {
    console.log(userData)
    return this.http.post(this.loginUrl,{"token": userData.id_token}).subscribe((data: any) => {
      this.isLoginEmitter.next(data.isLoggedIn)
      console.log('from back',data)
    })
  }
}
