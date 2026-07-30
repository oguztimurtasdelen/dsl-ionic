import { ITraining } from 'src/app/modules/training/training.model';
import { GetTrainingQueryDto } from './get-trainings-query.dto';

export interface GetTrainingsQueryReturnDto {
  trainings: ITraining[];
  pagination: GetTrainingQueryDto;
  total: number;
  totalPages: number;
}
