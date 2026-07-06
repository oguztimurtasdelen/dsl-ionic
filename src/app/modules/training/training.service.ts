import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { buildQueryParams } from 'src/app/core/helpers/query-params.helper';
import { GetTrainingsResponse } from './interface/get-trainings.response';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainingList(params?: Record<string, string | number | boolean | null | undefined>): Observable<GetTrainingsResponse> {
    return this.apiService.get('training', buildQueryParams(params));
  }
}
