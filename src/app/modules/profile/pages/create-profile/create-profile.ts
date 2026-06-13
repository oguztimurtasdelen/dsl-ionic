import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonInput, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { SessionService } from 'src/app/core/services/session.service';
import { ProfileService } from '../../profile.service';
import { IProfile } from 'src/app/core/dto/profile.interface';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.html',
  styleUrls: ['./create-profile.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CreateProfilePage implements OnInit {
  profileForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private profileService: ProfileService
  ) {
    this.profileForm = this.formBuilder.group({
      nickname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9._-]+$/)
      ]],
      avatar: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const currentUserId = this.sessionService.currentUserID;
      if (!currentUserId) {
        this.errorMessage = 'Kullanıcı bilgisi bulunamadı';
        this.loading = false;
        return;
      }

      this.profileService.createProfile({
        user: currentUserId,
        nickname: this.profileForm.value.nickname,
        avatar: this.profileForm.value.avatar,
        isActive: true
      }).subscribe({
        next: (response) => {
          this.sessionService.setCurrentProfile(response as IProfile);
          this.loading = false;
      this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Profil oluşturulurken hata oluştu';
          this.loading = false;
        }
      });


    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/auth/signin']);
  }

  getNicknameErrorMessage(): string {
    const control = this.profileForm.get('nickname');
    if (control?.hasError('required')) {
      return 'Kullanıcı adı zorunludur';
    }
    if (control?.hasError('minlength')) {
      return 'Kullanıcı adı en az 3 karakter olmalıdır';
    }
    if (control?.hasError('maxlength')) {
      return 'Kullanıcı adı en fazla 20 karakter olmalıdır';
    }
    if (control?.hasError('pattern')) {
      return 'Kullanıcı adı sadece harf, sayı, nokta, alt çizgi ve tire içerebilir';
    }
    return '';
  }
}
