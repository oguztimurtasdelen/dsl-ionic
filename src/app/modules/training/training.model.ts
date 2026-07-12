import { TrainingStatusEnum } from './enums/training-status.enum';
import { TrainingTypeEnum } from './enums/training-type.enum';

export interface ITraining {
    _id: string;
    profile: string;
    device: string;
    trainingType: TrainingTypeEnum;
    trainingStatus: TrainingStatusEnum;
    trainingLevel: number;
    trainingProgram: Object;
    trainingResult: Object;
    trainingMetrics: Object;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface TrainingListModel {
    _id: string;
    profile: string;
    device: string;
    trainingType: TrainingTypeEnum;
    trainingStatus: TrainingStatusEnum;
    trainingProgram: string;
    trainingResult: string;
    trainingMetrics: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
