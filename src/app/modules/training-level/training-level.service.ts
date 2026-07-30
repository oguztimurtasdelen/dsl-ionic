import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";
import { GetTrainingLevelsQueryReturnDto } from "./dto/get-training-levels-query-return.dto";
import { GetTrainingLevelsQueryDto } from "./dto/get-training-levels-query.dto";

@Injectable({
    providedIn: 'root'
})
export class TrainingLevelService {
    constructor(
        private apiService: ApiService
    ) {}

    getTrainingLevels(params: GetTrainingLevelsQueryDto): Observable<GetTrainingLevelsQueryReturnDto> {
        return this.apiService.get<GetTrainingLevelsQueryReturnDto>('training-level', params);
    }
}