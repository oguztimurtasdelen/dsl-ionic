import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { DevicelistComponent } from "../modules/device/pages/devicelist/devicelist.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, DevicelistComponent],
})
export class HomePage {
  constructor() {}
}
