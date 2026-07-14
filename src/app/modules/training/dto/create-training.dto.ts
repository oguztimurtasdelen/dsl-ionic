import { TrainingStatusEnum } from "../enums/training-status.enum";
import { TrainingTypeEnum } from "../enums/training-type.enum";

export interface CreateTrainingDto {
    profile: string;
    device?: string;
    trainingType: TrainingTypeEnum;
    trainingStatus: TrainingStatusEnum;
    trainingLevel?: number;
    trainingProgram?: Object;
    trainingResult?: Object;
}

