import { Component } from '@angular/core';
import { IonButton, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { DevicelistComponent } from '../modules/device/pages/devicelist/devicelist.component';
import { SessionService } from '../core/services/session.service';
import { CreateTrainingModalComponent } from '../modules/training/components/create-training-modal/create-training-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonContent, IonGrid, DevicelistComponent],
})
export class HomePage {
  constructor(
    private sessionService: SessionService,
    private modalController: ModalController,
  ) {}

  isTokenized = !!this.sessionService.accessToken;
  _currentUser = this.sessionService.currentUserID;

  async openCreateTrainingModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateTrainingModalComponent,
      componentProps: {},
      cssClass: 'training-modal',
    });

    await modal.present();
  }
}
