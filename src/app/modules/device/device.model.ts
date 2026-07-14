export interface IDevice {
  _id: string;
  macAddress: string;
  deviceCode: string;
  deviceName: string;
  deviceStatus: string;
  firmwareVersion: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
