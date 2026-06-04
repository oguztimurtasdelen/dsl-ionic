import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { DevicelistComponent } from "../modules/device/pages/devicelist/devicelist.component";
import { Router } from '@angular/router';
import { SessionService } from '../core/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButtons, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, DevicelistComponent, IonButton],
})
export class HomePage {
  constructor(
    private sessionService: SessionService

  ) {}
  isTokenized = !!this.sessionService.accessToken;
  _currentUser = this.sessionService.currentUser;


}
