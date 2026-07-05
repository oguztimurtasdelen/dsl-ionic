import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { DeviceListModel } from './device.model';
import { GetDevicesResponse } from './interface/get-devices.response';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private apiService:ApiService) { }

  getDeviceList(): Observable<GetDevicesResponse> {
    return this.apiService.get('device');
  }
}
