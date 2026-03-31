import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { DevicelistComponent } from "../modules/device/pages/devicelist/devicelist.component";
import { TokenService } from '../core/services/token.service';
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
    private tokenService: TokenService,
    private router: Router,
    private sessionService: SessionService

  ) {}

  userId = this.sessionService.userId;



  signOut() {
    this.sessionService.clearUserId();
    this.tokenService.clear();
    this.router.navigate(['/signin']);
  }

}
