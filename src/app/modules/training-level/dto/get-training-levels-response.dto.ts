import { TrainingTypeEnum } from "../../training/enums/training-type.enum";

export interface GetTrainingLevelsResponse {
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
}