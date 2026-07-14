import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { TrainingTypeEnum } from '../../enums/training-type.enum';
import { TrainingService } from '../../training.service';
import { TrainingStatusEnum } from '../../enums/training-status.enum';
import { SessionService } from 'src/app/core/services/session.service';
import { GetTrainingLevelsResponse } from '../../dto/get-training-levels-response.dto';
import { ITraining } from '../../training.model';
import { CreateTrainingResponseDto } from '../../dto/create-training-response.dto';

@Component({
  selector: 'app-create-training-modal',
  templateUrl: './create-training-modal.component.html',
  styleUrls: ['./create-training-modal.component.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [CommonModule, FormsModule, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonSpinner, IonTitle, IonToolbar],
})
export class CreateTrainingModalComponent implements OnInit {
  readonly trainingTypes = Object.values(TrainingTypeEnum);
  step = 1;
  selectedTrainingType: TrainingTypeEnum | null = null;
  selectedTrainingLevel: number | null = null;
  trainingLevels: GetTrainingLevelsResponse[] = [];
  loadingLevels = false;
  creatingTraining = false;

  createTrainingForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private trainingService: TrainingService,
    private sessionService: SessionService
  ) {
    this.createTrainingForm = this.formBuilder.group({
      profile: [this.sessionService.currentProfileID, [Validators.required]],
      trainingType: [null, [Validators.required]],
      trainingStatus: [TrainingStatusEnum.NEW, [Validators.required]],
      trainingLevel: [null, [Validators.required, Validators.min(1), Validators.max(99)]]
    });
    
  }

  ngOnInit(): void {
    this.step = 1;
  }

  async dismiss(): Promise<void> {
    await this.modalController.dismiss();
  }

  selectTrainingType(trainingType: TrainingTypeEnum): void {
    this.selectedTrainingType = trainingType;
    this.loadingLevels = true;
    this.trainingService.getTrainingLevels(trainingType).subscribe({
      next: (trainingLevels: GetTrainingLevelsResponse[]) => {
        this.trainingLevels = trainingLevels;
        this.loadingLevels = false;
        this.step = 2;
      },
      error: (error) => {
        console.error('Failed to load training levels', error);
        this.trainingLevels = [];
        this.loadingLevels = false;
        this.step = 2;
      },
    });
  }

  goBack(): void {
    this.step = 1;
    this.selectedTrainingType = null;
    this.trainingLevels = [];
  }

  createTraining(selectedLevel: number): void {
    this.creatingTraining = true;
    this.createTrainingForm.patchValue({
      trainingType: this.selectedTrainingType,
      trainingLevel: selectedLevel,
    });

    if (this.createTrainingForm.valid) {
      this.trainingService.createTraining(this.createTrainingForm.value).subscribe({
        next: (response: CreateTrainingResponseDto) => {
          this.creatingTraining = false;
          this.dismiss();
        },
        error: (error) => {
          this.creatingTraining = false;
          console.error('Failed to create training', error);
        }
      });
    } else {
      console.log(this.createTrainingForm.value);
      this.creatingTraining = false;
    }
  }
}
