import { TrainingTypeEnum } from "../../training/enums/training-type.enum";

export interface GetTrainingLevelsQueryDto {
    page: number;
    limit: number;
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
}