import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonCol, IonRow, IonItem, IonButton, IonGrid, IonInput } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { SessionService } from 'src/app/core/services/session.service';
import { IUser } from 'src/app/core/dto/user.interface';
import { IProfile } from 'src/app/core/dto/profile.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonInput, IonGrid, IonButton, IonItem, IonRow, IonCol, IonLabel, IonHeader, IonTitle, IonToolbar, IonContent, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, IonHeader]
})
export class SigninPage  implements OnInit {
  signinForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sessionService: SessionService
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['oguz.tasdelen@runtiya.com', [Validators.required, Validators.email]],
      password: ['Runtiya.35', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.authenticationService.signIn(this.signinForm.value).subscribe({
        next: (response) => {
          this.sessionService.setAccessToken(response.accessToken);
          this.sessionService.setCurrentUser(response.user as IUser);
          if(response.isThereProfile){
            this.sessionService.setCurrentProfile(response.user.profile as IProfile);
            this.router.navigate(['/home']);
            return;
          }
          else {
            this.router.navigate(['/create-profile']);
            return;
          }

        },
        error: (error) => {
            console.error('Signin failed', error);
        }
      });
    } else {
      this.signinForm.markAllAsTouched();
      return;
    }
  }

}

