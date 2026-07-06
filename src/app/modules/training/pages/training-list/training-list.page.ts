import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonRow, IonButton, IonBadge, IonText, IonGrid, IonSpinner } from '@ionic/angular/standalone';
import { TrainingListModel } from '../../training.model';
import { Router } from '@angular/router';
import { TrainingService } from '../../training.service';
import { SessionService } from 'src/app/core/services/session.service';
import { GetTrainingsResponse } from '../../interface/get-trainings.response';
import { TrainingStatusEnum } from '../../enums/training-status.enum';
import { TrainingTypeEnum } from '../../enums/training-type.enum';
import { getTrainingStatusColor } from '../../helpers/training-status.helper';
import { buildQueryParams } from 'src/app/core/helpers/query-params.helper';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.page.html',
  styleUrls: ['./training-list.page.scss'],
  standalone: true,
  imports: [IonGrid, IonText, IonBadge, IonButton, IonRow, IonCol, IonContent, IonSpinner, CommonModule, FormsModule]
})
export class TrainingListPage implements OnInit {
  loading = true;
  error: string | null = null;
  readonly TrainingStatusEnum = TrainingStatusEnum;
  readonly trainingTypes = Object.values(TrainingTypeEnum);
  readonly trainingStatuses = Object.values(TrainingStatusEnum);

  @Input() trainingList: TrainingListModel[] = [];
  selectedTrainingType = '';
  selectedTrainingStatus = '';
  selectedDate = '';

  constructor(
    private router: Router,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.loadTrainings();
  }

  loadTrainings(): void {
    this.trainingService.getTrainingList(this.buildQueryParams()).subscribe({
      next: (response: GetTrainingsResponse) => {
        this.trainingList = response.trainings;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load trainings', error);
        this.error = error.message || 'Antrenmanlar yüklenirken bir hata oluştu.';
        this.trainingList = [];
        this.loading = false;
      }
    });
  }

  goToTrainingDetail(id: string) {
    this.router.navigate(['/training-detail', id]);
  }

  applyFilters(): void {
    this.loadTrainings();
  }

  resetFilters(): void {
    this.selectedTrainingType = '';
    this.selectedTrainingStatus = '';
    this.selectedDate = '';
    this.loadTrainings();
  }

  private buildQueryParams(): Record<string, string> {
    return buildQueryParams({
      trainingType: this.selectedTrainingType || undefined,
      trainingStatus: this.selectedTrainingStatus || undefined,
      createdAt: this.selectedDate || undefined
    });
  }

  getStatusColor(status: string): string {
    return getTrainingStatusColor(status);
  }

}
