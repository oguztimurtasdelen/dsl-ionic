import { ITraining } from 'src/app/modules/training/training.model';

export interface GetTrainingsResponseDto {
  trainings: ITraining[];
  pagination: TrainingPagination;
}

export interface TrainingPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  trainingType: string;
  trainingStatus: string;
  trainingLevel: number;
  createdAt: string;
}