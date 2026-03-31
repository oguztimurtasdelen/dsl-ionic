import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonCol, IonRow, IonItem, IonButton, IonGrid, IonInput } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SessionService } from 'src/app/core/services/session.service';

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
    private tokenService: TokenService,
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
      console.log('Form Submitted', this.signinForm.value);
      this.authenticationService.signIn(this.signinForm.value).subscribe({
        next: (response) => {
          //this.tokenService.set(response.accessToken);
          //this.sessionService.setUserId(this.sessionService.decodeJWTPayload(response.accessToken).userId);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Signin failed', error);
        }
      });
    } else {
      console.log('Form is invalid');
      this.signinForm.markAllAsTouched();
      return;
    }
  }

}

