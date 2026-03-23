import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { TrainingListModel } from './training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private apiService: ApiService) { }

  getTrainingList(): Observable<TrainingListModel[]> {
    return this.apiService.get('training');
  }
}
