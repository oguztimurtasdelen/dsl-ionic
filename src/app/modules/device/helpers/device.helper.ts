import { DeviceStatusEnum } from '../enums/device-status.enum';

export function getDeviceStatusColor(status: string): string {
  switch (status) {
    case DeviceStatusEnum.OFFLINE:
      return '#989aa2';
    case DeviceStatusEnum.AVAILABLE:
      return '#2dd36f';
    case DeviceStatusEnum.BUSY:
      return '#ffc409';
    case DeviceStatusEnum.BROKEN:
      return '#eb445a';
    case DeviceStatusEnum.ON_UPDATE:
      return '#3880ff';
    case DeviceStatusEnum.ON_SETUP:
      return '#f7941d';
    default:
      return '#989aa2';
  }
}
