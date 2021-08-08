import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showLogOut = false;
  constructor(private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  hidden = false;

  onShowLogOut() {
    this.showLogOut = !this.showLogOut;
  }
  onLogout() {
    this.cookieService.delete('auth-token')
    this.router.navigate(['/sign-in'], {relativeTo: this.route})
  }

}
