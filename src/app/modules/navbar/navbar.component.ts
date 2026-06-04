import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonIcon,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  MenuController,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menu, home, settings, logOut } from 'ionicons/icons';
import { SessionService } from '../../core/services/session.service';
import { filter, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonIcon,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonMenuToggle,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  userFullName = 'Misafir'; // Direkt başlangıç değer ver
  private destroy$ = new Subject<void>();

  constructor(
    private sessionService: SessionService,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    addIcons({ menu, home, settings, logOut });
  }

  ngOnInit() {
    // Mevcut kullanıcı varsa hemen göster
    this.updateUserInfo();

    // Sonra subscription ile değişiklikleri dinle
    this.sessionService.isInitialized$
      .pipe(
        filter(initialized => initialized === true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateUserInfo();
      });
  }

  private updateUserInfo() {
    const user = this.sessionService.currentUser;
    this.isLoggedIn = !!user;
    this.userFullName = user?.name || 'Misafir';
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate(['/signin']);
    this.menuCtrl.close();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.menuCtrl.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
