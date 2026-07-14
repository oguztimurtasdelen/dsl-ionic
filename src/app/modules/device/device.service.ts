import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { IDevice } from './device.model';
import { GetDevicesResponse } from './dto/get-devices-response.dto';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private apiService:ApiService) { }

  getDeviceList(): Observable<GetDevicesResponse> {
    return this.apiService.get('device');
  }
}
