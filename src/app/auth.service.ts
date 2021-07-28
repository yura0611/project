import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = 'http://localhost:3000/api/user/login';
  allQuestionUrl = 'http://localhost:3000/api/question'

  constructor(private http: HttpClient) {
  }


  sendToken(userData) {
    console.log(userData)
    return this.http.post(this.loginUrl,{"token": userData.id_token}, {observe: "response"}).subscribe(data => {
      console.log('from back',data)
    })
  }
}
