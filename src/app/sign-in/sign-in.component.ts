import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../auth.service";
import {takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy, AfterViewInit {
  observableAlive = true;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngAfterViewInit() {
    this.route.queryParams.pipe(
      tap(v => this.authService.setQueryParams(v)),
      takeWhile(() => this.observableAlive)
    ).subscribe();
  }


  ngOnDestroy() {
    this.observableAlive = false;
  }


}
