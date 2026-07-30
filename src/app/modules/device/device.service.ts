import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { IDevice } from './device.model';
import { GetDevicesQueryReturnDto } from './dto/get-devices-query-return.dto';
import { buildQueryParams } from 'src/app/core/helpers/query-params.helper';
import { GetDevicesQueryDto } from './dto/get-devices-query.dto';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private apiService:ApiService) { }

  getDeviceList(params?: GetDevicesQueryDto): Observable<GetDevicesQueryReturnDto> {
    return this.apiService.get('device', params);
  }
}
