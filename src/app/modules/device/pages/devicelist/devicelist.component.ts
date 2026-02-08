import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../device.service';
import { DeviceListModel } from '../../device.model';
import { IonContent, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonList, IonListHeader, IonLabel, IonItem, IonText } from "@ionic/angular/standalone";


@Component({
  selector: 'app-devicelist',
  templateUrl: './devicelist.component.html',
  styleUrls: ['./devicelist.component.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonSpinner, IonAlert, IonList, IonListHeader, IonLabel, IonItem, IonText],
})
export class DevicelistComponent  implements OnInit {

  loading = true;
  error: string | null = null;

  device: DeviceListModel = {
     deviceCode: '',
    deviceName: '',
    status: '',
    firmwareVersion: '',
    description: ''
  };

  devices : DeviceListModel[] = [];

  constructor(
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDeviceList().subscribe({
      next: (response) => {
        console.log('Devices loaded successfully', response);
        for (let device of response) {
          console.log('Device:', device);
          device.deviceCode = device.deviceCode;
          device.deviceName = device.deviceName;
          device.status = device.status;
          device.firmwareVersion = device.firmwareVersion;
          device.description = device.description;

          this.devices.push(device);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load devices', error);
        this.error = error.message || 'Cihazlar yüklenirken bir hata oluştu.';
        this.loading = false;
      }
    });
  }
}
