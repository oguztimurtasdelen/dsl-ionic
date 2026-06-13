import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CreateProfileRequest, ProfileModel } from './profile.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }

  createProfile(body: CreateProfileRequest): Observable<ProfileModel> {
    return this.apiService.post('profile', body);
  }
}
