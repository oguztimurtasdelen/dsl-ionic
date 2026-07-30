import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonRow, IonButton, IonBadge, IonText, IonGrid, IonSpinner } from '@ionic/angular/standalone';
import { ITraining } from '../../training.model';
import { Router } from '@angular/router';
import { TrainingService } from '../../training.service';
import { GetTrainingsQueryReturnDto } from '../../dto/get-trainings-query-return.dto';
import { TrainingStatusEnum } from '../../enums/training-status.enum';
import { TrainingTypeEnum } from '../../enums/training-type.enum';
import { getTrainingStatusColor } from '../../helpers/training.helper';
import { buildQueryParams } from 'src/app/core/helpers/query-params.helper';
import { GetTrainingQueryDto } from '../../dto/get-trainings-query.dto';


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

  @Input() trainingList: ITraining[] = [];
  selectedTrainingType: TrainingTypeEnum | string = '';
  selectedTrainingStatus: TrainingStatusEnum | string = '';
  selectedDate: string | Date = '';

  trainings: ITraining[] = [];
  params: GetTrainingQueryDto = <GetTrainingQueryDto>{page: 1, limit: 10};

  constructor(
    private router: Router,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.loadTrainings();
  }

  loadTrainings(): void {
    this.params.trainingType = this.selectedTrainingType as TrainingTypeEnum
    this.params.trainingStatus = this.selectedTrainingStatus as TrainingStatusEnum
    this.params.createdAt = this.selectedDate as string | Date; 

    console.log(this.params);

    this.trainingService.getTrainingList(this.params).subscribe({
      next: (response: GetTrainingsQueryReturnDto) => {
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

  getStatusColor(status: string): string {
    return getTrainingStatusColor(status);
  }

}
