import { ITrainingLevel } from "../training-level.model";
import { GetTrainingLevelsQueryDto } from "./get-training-levels-query.dto";

export interface GetTrainingLevelsQueryReturnDto {
    trainingLevels: ITrainingLevel[],
    pagination: GetTrainingLevelsQueryDto;
    total: number;
    totalPages: number;
}