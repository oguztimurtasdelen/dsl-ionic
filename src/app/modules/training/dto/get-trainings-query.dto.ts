import { TrainingStatusEnum } from "../enums/training-status.enum";
import { TrainingTypeEnum } from "../enums/training-type.enum";

export interface GetTrainingQueryDto {
    page: number;
    limit: number;
    profile?: string;
    trainingType?: TrainingTypeEnum;
    trainingStatus?: TrainingStatusEnum;
    trainingLevel?: number;
    createdAt?: string | Date;
}