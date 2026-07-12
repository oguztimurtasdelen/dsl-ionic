import { TrainingStatusEnum } from "../enums/training-status.enum";
import { TrainingTypeEnum } from "../enums/training-type.enum";

export interface CreateTrainingRequest {
    profile: string;
    trainingType: TrainingTypeEnum;
    trainingStatus: TrainingStatusEnum;
    trainingProgram: string;
}