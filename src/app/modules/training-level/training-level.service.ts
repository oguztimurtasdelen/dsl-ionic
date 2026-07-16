import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { GetTrainingLevelsResponse } from "./dto/get-training-levels-response.dto";
import { buildQueryParams } from "src/app/core/helpers/query-params.helper";

@Injectable({
    providedIn: 'root'
})
export class TrainingLevelService {
    constructor(
        private apiService: ApiService
    ) {}

    getTrainingLevels(trainingType: string): Observable<GetTrainingLevelsResponse[]> {
        return this.apiService.get<GetTrainingLevelsResponse[]>('training-level', buildQueryParams({trainingType}));
    }
}