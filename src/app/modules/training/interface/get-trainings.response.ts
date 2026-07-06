import { TrainingListModel } from '../training.model';

export interface GetTrainingsResponse {
  trainings: TrainingListModel[];
  pagination: TrainingPagination;
}

export interface TrainingPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  trainingType?: string;
  trainingStatus?: string;
}
