import { TrainingStatusEnum } from './enums/training-status.enum';
import { TrainingTypeEnum } from './enums/training-type.enum';

export interface TrainingMetric {
  total: number;
  success: number;
  fail: number;
  averageReactionTime: number;
}

export interface TrainingProgramStep {
  sensorNo: number;
  duration: number;
}

export interface TrainingResultStep {
  sensorNo: number;
  actionTime: number;
  isSuccess: boolean;
}

export interface ITraining {
    _id: string;
    profile: string;
    device: string;
    trainingType: TrainingTypeEnum;
    trainingStatus: TrainingStatusEnum;
    trainingLevel: number;
    trainingProgram: TrainingProgramStep[];
    trainingResult: TrainingResultStep[];
    trainingMetrics: TrainingMetric;
    createdAt: Date | string;
    updatedAt: Date | string;
}
