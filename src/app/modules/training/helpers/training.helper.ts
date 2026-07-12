import { TrainingStatusEnum } from '../enums/training-status.enum';

export function getTrainingStatusColor(status: string): string {
  switch (status) {
    case TrainingStatusEnum.NEW:
      return '#3880ff';
    case TrainingStatusEnum.READY:
      return '#ffc409';
    case TrainingStatusEnum.STARTED:
      return '#f7941d';
    case TrainingStatusEnum.COMPLETED:
      return '#2dd36f';
    case TrainingStatusEnum.CANCELLED:
      return '#989aa2';
    case TrainingStatusEnum.ERROR:
      return '#eb445a';
    default:
      return '#989aa2';
  }
}
