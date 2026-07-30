import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';
import { CreateTrainingDto } from './dto/create-training.dto';
import { CreateTrainingResponseDto } from './dto/create-training-response.dto';
import { GetTrainingQueryDto } from './dto/get-trainings-query.dto';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainingList(params?: GetTrainingQueryDto): Observable<GetTrainingsQueryReturnDto> {
    return this.apiService.get<GetTrainingsQueryReturnDto>('training', params);
  }

  createTraining(payload: CreateTrainingDto): Observable<CreateTrainingResponseDto> {
    return this.apiService.post<CreateTrainingResponseDto>('training', payload);
  }
}
