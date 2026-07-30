import { IDevice } from '../device.model';
import { GetDevicesQueryDto } from './get-devices-query.dto';

export interface GetDevicesQueryReturnDto {
  devices: IDevice[];
  pagination: GetDevicesQueryDto;
  total: number;
  totalPages: number;

}