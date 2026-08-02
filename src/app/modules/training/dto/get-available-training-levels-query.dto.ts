import { TrainingTypeEnum } from "../enums/training-type.enum";

export interface GetAvailableTrainingLevelsQueryDto {
    profile: string;
    trainingType: TrainingTypeEnum;
}