import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { buildQueryParams } from 'src/app/core/helpers/query-params.helper';
import { GetTrainingsResponseDto } from './dto/get-trainings-response.dto';
import { GetTrainingLevelsResponse } from '../training-level/dto/get-training-levels-response.dto';
import { CreateTrainingDto } from './dto/create-training.dto';
import { ITraining } from './training.model';
import { CreateTrainingResponseDto } from './dto/create-training-response.dto';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainingList(params?: Record<string, string | number | boolean | null | undefined>): Observable<GetTrainingsResponseDto> {
    return this.apiService.get('training', buildQueryParams(params));
  }

  createTraining(payload: CreateTrainingDto): Observable<CreateTrainingResponseDto> {
    return this.apiService.post('training', payload);
  }
}
