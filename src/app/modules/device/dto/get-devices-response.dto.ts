import { IDevice } from '../device.model';

export interface GetDevicesResponse {
  devices: IDevice[];
  pagination: DevicePagination;

}

export interface DevicePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  deviceCode?: string;
  deviceName?: string;
  deviceStatus?: string;

}