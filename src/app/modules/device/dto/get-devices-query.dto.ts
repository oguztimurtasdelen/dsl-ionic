import { TrainingTypeEnum } from "../../training/enums/training-type.enum";
import { DeviceStatusEnum } from "../enums/device-status.enum";

export interface GetDevicesQueryDto {
    page: number;
    limit: number;
    trainingType: TrainingTypeEnum;
    deviceCode: string;
    deviceName: string;
    deviceStatus: DeviceStatusEnum;
}