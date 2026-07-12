import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { buildQueryParams } from 'src/app/core/helpers/query-params.helper';
import { GetTrainingsResponse } from './contracts/responses/get-trainings.response';
import { GetTrainingLevelsResponse } from './contracts/responses/get-training-levels.response';
import { CreateTrainingRequest } from './contracts/requests/create-training.request';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainingList(params?: Record<string, string | number | boolean | null | undefined>): Observable<GetTrainingsResponse> {
    return this.apiService.get('training', buildQueryParams(params));
  }

  getTrainingLevels(trainingType: string): Observable<GetTrainingLevelsResponse[]> {
    return this.apiService.get<GetTrainingLevelsResponse[]>('training-level', buildQueryParams({ trainingType }));
  }

  createTraining(payload: CreateTrainingRequest): Observable<unknown> {
    return this.apiService.post('training', payload);
  }
}
