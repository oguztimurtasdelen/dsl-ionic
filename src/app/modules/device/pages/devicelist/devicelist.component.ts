import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';
import { IDevice } from '../../device.model';
import { IonContent, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonList, IonListHeader, IonLabel, IonItem, IonText } from "@ionic/angular/standalone";
import { GetDevicesQueryReturnDto } from '../../dto/get-devices-query-return.dto';
import { getDeviceStatusColor } from '../../helpers/device.helper';
import { GetDevicesQueryDto } from '../../dto/get-devices-query.dto';
import { DeviceStatusEnum } from '../../enums/device-status.enum';


@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss'],
  standalone: true,
  imports: [IonCard, IonSpinner, IonAlert, IonList, IonListHeader, IonLabel, IonItem, IonText],
})
export class DevicelistComponent  implements OnInit {

  loading = true;
  error: string | null = null;

  devices : IDevice[] = [];
  params: GetDevicesQueryDto = <GetDevicesQueryDto>{page: 1, limit: 10};

  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDeviceList(this.params).subscribe({
      next: (response: GetDevicesQueryReturnDto) => {
        this.devices = response.devices;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load devices', error);
        this.error = error.message || 'Cihazlar yüklenirken bir hata oluştu.';
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    return getDeviceStatusColor(status);
  }
}
