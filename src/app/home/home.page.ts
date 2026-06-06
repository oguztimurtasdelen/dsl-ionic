import { Component } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DevicelistComponent } from "../modules/device/pages/devicelist/devicelist.component";
import { SessionService } from '../core/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonContent, IonGrid, DevicelistComponent],
})
export class HomePage {
  constructor(
    private sessionService: SessionService

  ) {}
  isTokenized = !!this.sessionService.accessToken;
  _currentUser = this.sessionService.currentUser;


}
