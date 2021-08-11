import {Component, Input, OnInit} from '@angular/core';
import {VacanciesService} from '../../shared/vacancies.service';
import {EvaluationService} from '../../shared/evaluation.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss']
})
export class ApplicationsTableComponent implements OnInit {
  @Input() vacancyId: string;

  evaluationData;
  show = false;

  constructor(
    public vacancyTableService: VacanciesService,
    public evaluationService: EvaluationService) {
  }

  displayedColumns = ['select', 'candidate', 'status', 'score', 'reviewer', 'invited'];


  ngOnInit(): void {
    this.initMaterialTable()
  }

  initMaterialTable() {
    this.evaluationService.getEvaluations(this.vacancyId).subscribe(data => {
        if (!data.length) {
          this.show = true;
        }
        this.evaluationData = new MatTableDataSource(data);
      }
    );
  }

  openReviwerModal(): void {
    this.vacancyTableService.ReviewerModal();
  }


}



