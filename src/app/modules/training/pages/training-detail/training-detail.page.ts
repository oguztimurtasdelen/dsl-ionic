import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TrainingService } from '../../training.service';
import { ITraining } from '../../training.model';
import { TrainingStatusEnum } from '../../enums/training-status.enum';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.page.html',
  styleUrls: ['./training-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonSpinner, CommonModule, FormsModule]
})
export class TrainingDetailPage implements OnInit {
  training: ITraining | null = null;
  loading = true;
  error: string | null = null;
  readonly TrainingStatusEnum = TrainingStatusEnum;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    const trainingId = this.route.snapshot.paramMap.get('id');
    if (trainingId) {
      this.trainingService.getTrainingById(trainingId).subscribe({
        next: (training: ITraining) => {
          this.training = training;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load training detail', error);
          this.error = error?.message || 'Unable to load training detail.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'Training ID is missing.';
      this.loading = false;
    }
  }
}
