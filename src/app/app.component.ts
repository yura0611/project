import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'screening-tool';

  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
    this.cookieService.set('token', 'test-token')
    console.log(this.cookieService.get('token'))
  }
}
