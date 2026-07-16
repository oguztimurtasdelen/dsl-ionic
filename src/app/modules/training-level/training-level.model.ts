import { TrainingTypeEnum } from "../training/enums/training-type.enum";

export interface ITrainingLevel {
    _id: string;
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
    trainingProgram: object;
    createdAt: Date | string;
    updatedAt: Date | string;
}