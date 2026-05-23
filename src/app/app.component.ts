import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private sessionService: SessionService) {
    this.sessionService.loadCurrentUser();
    this.sessionService.loadAccessToken();
  }
}
