import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { DeviceListModel } from './device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private apiService:ApiService) { }

  getDeviceList(): Observable<DeviceListModel[]>{
    return this.apiService.get('device');
  }
}
