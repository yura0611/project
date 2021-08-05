import {Component, OnInit} from '@angular/core';
import {HomePageService} from "./shared/home-page.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  numberOfActiveVacancies: number
  constructor(private homeService: HomePageService) {

  }

  ngOnInit(): void {
    this.homeService.activeVacancy$.subscribe(data => this.numberOfActiveVacancies = data)
  }

}
