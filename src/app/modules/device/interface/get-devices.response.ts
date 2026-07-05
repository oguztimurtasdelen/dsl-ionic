import { DeviceListModel } from '../../../modules/device/device.model';

export interface GetDevicesResponse {
  devices: DeviceListModel[];
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