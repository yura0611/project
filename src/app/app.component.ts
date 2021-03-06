import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHead: boolean = false;
  title = 'screening-tool';
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/sign-in' || event['url'].startsWith('/evaluation') || event['url'].startsWith('/congratulations')) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
  ngOnInit(): void {

  }

}
