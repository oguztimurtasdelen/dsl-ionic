import { TrainingTypeEnum } from "../enums/training-type.enum";

export interface GetAvailableTrainingLevelsQueryReturnDto {
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
    isCompleted: boolean;
    isLocked: boolean;
}