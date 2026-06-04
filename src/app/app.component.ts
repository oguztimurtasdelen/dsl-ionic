import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SessionService } from './core/services/session.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, NavbarComponent, CommonModule],
})
export class AppComponent implements OnInit {
  showNavbar = true;
  sessionInitialized = false; // ← Ekle

  private noNavbarRoutes = ['signin', 'signup'];

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Initialize() tamamen bitene kadar bekle
    await this.sessionService.initialize();
    this.sessionInitialized = true; // ← Sonra flag'i aç
    this.checkNavbarVisibility();
  }

  checkNavbarVisibility() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url.split('/')[1];
      this.showNavbar = !this.noNavbarRoutes.includes(currentRoute);
    });
  }
}
