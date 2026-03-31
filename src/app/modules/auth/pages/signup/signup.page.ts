import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonList, IonCheckbox, IonButton, IonDatetime, IonHeader, IonToolbar, IonTitle, IonProgressBar, IonAlert } from '@ionic/angular/standalone';
import { IsPasswordValidationMatchValidators } from "src/app/core/validators/isPasswordValidationMatch";
import { UserRoleEnum } from 'src/app/core/enums/userRole.enum';
import { UserTypeEnum } from 'src/app/core/enums/userType.enum';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonAlert, IonToolbar, IonRow, IonButton, IonCheckbox, IonList, IonInput, IonLabel, IonItem, IonGrid, IonCol, IonContent, CommonModule, FormsModule, ReactiveFormsModule, IonDatetime, IonHeader, IonTitle, IonToolbar, IonProgressBar]
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  userRoles = UserRoleEnum;
  userTypes = UserTypeEnum;
  maxDate: string = new Date().toISOString(); // Bugünün tarihi ISO formatında
  isLoading: boolean = false;
  showInvalidAlert: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      /*
      this.signupForm = this.formBuilder.group({
        name: ['Oguz Timur', [Validators.required]],
        surname: ['Tasdelen', [Validators.required]],
        email: ['o.tasdelen@runtiya.com', [Validators.required, Validators.email]],
        phoneNumber: ['+905551112233', [Validators.required, Validators.pattern(/^\+905\d{9}$/)]], // TR phone number format
        birthDate: ['1996-04-17', [Validators.required]],
        password: ['Runtiya.35', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
        passwordValidation: ['Runtiya.35', [Validators.required]],
        userRole: [this.userRoles["USER"], [Validators.required]],
        userType: [this.userTypes["ATHLETE"], [Validators.required]],
        termsAndConditions: this.formBuilder.group({
          termsAndConditions: [true, [Validators.required]],
          dataProcessing: [true, [Validators.required]],
          emailSubscription: [false, []]
        }),
        isEmailVerified: [false, [Validators.required]],
        isActive: [true, [Validators.required]]
      },
      {
        validators: IsPasswordValidationMatchValidators.IsPasswordValidationMatchConstraint('password', 'passwordValidation')
      });
      */
      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^\+905\d{9}$/)]], // TR phone number format
        birthDate: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
        passwordValidation: ['', [Validators.required]],
        userRole: [this.userRoles["USER"], [Validators.required]],
        userType: [this.userTypes["ATHLETE"], [Validators.required]],
        termsAndConditions: this.formBuilder.group({
          termsAndConditions: [false, [Validators.requiredTrue]],
          dataProcessing: [false, [Validators.requiredTrue]],
          emailSubscription: [false, []]
        }),
        isEmailVerified: [true, [Validators.required]],
        isActive: [true, [Validators.required]]
      },
      {
        validators: IsPasswordValidationMatchValidators.IsPasswordValidationMatchConstraint('password', 'passwordValidation')
      });
   }

  ngOnInit() {

  }

  onSubmit() {
    this.isLoading = true;
    if (this.signupForm.valid) {
      this.signupForm.get('birthDate')?.setValue(
        this.signupForm.get('birthDate')?.getRawValue().split('T')[0]
      );
      this.authenticationService.signUp(this.signupForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error('Signup failed', error);
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.showInvalidAlert = true;
    }
    this.isLoading = false;
  }

}
