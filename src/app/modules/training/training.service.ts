import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';
import { CreateTrainingDto } from './dto/create-training.dto';
import { CreateTrainingResponseDto } from './dto/create-training-response.dto';
import { GetTrainingQueryDto } from './dto/get-trainings-query.dto';
import { GetAvailableTrainingLevelsQueryDto } from './dto/get-available-training-levels-query.dto';
import { GetAvailableTrainingLevelsQueryReturnDto } from './dto/get-available-training-levels-query-return.dto';
import { ITraining } from './training.model';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainingList(params?: GetTrainingQueryDto): Observable<GetTrainingsQueryReturnDto> {
    return this.apiService.get<GetTrainingsQueryReturnDto>('training', params);
  }

  getTrainingById(id: string): Observable<ITraining> {
    return this.apiService.get<ITraining>(`training/${id}`);
  }

  getAvailableTrainingLevels(params: GetAvailableTrainingLevelsQueryDto): Observable<GetAvailableTrainingLevelsQueryReturnDto[]> {
    return this.apiService.get<GetAvailableTrainingLevelsQueryReturnDto[]>('training/available-traininglevels', params);
  }

  createTraining(payload: CreateTrainingDto): Observable<CreateTrainingResponseDto> {
    return this.apiService.post<CreateTrainingResponseDto>('training', payload);
  }
}
