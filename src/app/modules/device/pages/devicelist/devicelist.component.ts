import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';
import { IDevice } from '../../device.model';
import { IonContent, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonList, IonListHeader, IonLabel, IonItem, IonText } from "@ionic/angular/standalone";
import { GetDevicesResponse } from '../../dto/get-devices-response.dto';
import { getDeviceStatusColor } from '../../helpers/device-status.helper';


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
  pagination: GetDevicesResponse['pagination'] | null = null;

  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDeviceList().subscribe({
      next: (response: GetDevicesResponse) => {
        for (let device of response.devices) {
          this.devices.push(device);
        }
        this.pagination = response.pagination;
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
