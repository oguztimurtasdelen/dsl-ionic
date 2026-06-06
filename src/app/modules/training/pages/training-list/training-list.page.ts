import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCol, IonRow, IonButton, IonBadge, IonText, IonGrid } from '@ionic/angular/standalone';
import { TrainingListModel } from '../../training.model';
import { Router } from '@angular/router';
import { TrainingService } from '../../training.service';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.page.html',
  styleUrls: ['./training-list.page.scss'],
  standalone: true,
  imports: [IonGrid, IonText, IonBadge, IonButton, IonRow, IonCol, IonContent, CommonModule, FormsModule]
})
export class TrainingListPage implements OnInit {
  @Input() trainingList: TrainingListModel[] = [];

  constructor(
    private router: Router,
    private trainingService: TrainingService,
    private sessionService: SessionService
  ) { }

  _currentUser = this.sessionService.currentUser;

  ngOnInit() {
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainingService.getTrainingList().subscribe({
      next: (response) => {
        this.trainingList = response;
      },
      error: (error) => {
        console.error('Failed to load trainings', error);
        this.trainingList = [];
      }
    });

  }

  goToTrainingDetail(id: string) {
    this.router.navigate(['/training-detail', id]);
  }

}
