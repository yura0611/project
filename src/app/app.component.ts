import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'screening-tool';
  login;
  constructor(private cookieService: CookieService, public cookiesService: CookieService) {
  }

  ngOnInit() {
    this.cookieService.set('token', 'test-token')
    console.log(this.cookieService.get('token'))
    // this.googleAuth.loginSubject.subscribe(data => this.login = data)
    // this.authService.isLoginEmitter.subscribe(data => this.login = data)
    console.log(this.login)
  }

  isLoggedIn() {

  }
}
