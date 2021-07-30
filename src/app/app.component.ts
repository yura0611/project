import {Component, OnInit} from '@angular/core';
import {GoogleAuthService} from './sign-in/shared/google-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'screening-tool';
  isLogin: boolean;
  constructor(public googleAuthService: GoogleAuthService) {}

  ngOnInit(): void {
    this.googleAuthService.loginSubject.subscribe((data: boolean) => this.isLogin = data);
  }


}
