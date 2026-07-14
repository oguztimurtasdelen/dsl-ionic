import { TrainingTypeEnum } from "../enums/training-type.enum";

export interface GetTrainingLevelsResponse {
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
}