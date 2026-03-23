import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SignInModel, SignUpModel } from './authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  // Observable will change with strict return type model.
  signIn(signInForm : SignInModel): Observable<{success: boolean, token:string}>{
    return this.apiService.post('authentication/signin', signInForm);
  }

  // Observable type model will be defined
  signUp(signUpForm: SignUpModel): Observable<{success: boolean, message: string}> {
    return this.apiService.post('authentication/signup', signUpForm)
  }
}
