import { Component, OnInit } from '@angular/core';
import {GoogleAuthService} from "../shared/google-auth.service";

@Component({
  selector: 'app-google-auth-button',
  templateUrl: './google-auth-button.component.html',
  styleUrls: ['./google-auth-button.component.scss']
})
export class GoogleAuthButtonComponent implements OnInit {
  constructor(private googleAuth: GoogleAuthService) { }

  ngOnInit(): void {
    this.googleAuth.checkIfUserAuthenticated()
  }


  onAuthenticate() {
    return this.googleAuth.authenticate()
  }

}
