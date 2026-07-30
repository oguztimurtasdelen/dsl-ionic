import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { DeviceService } from '../../device.service';
import { DeviceStatusEnum } from '../../enums/device-status.enum';
import { getDeviceStatusColor } from '../../helpers/device.helper';
import { DevicelistComponent } from './devicelist.component';

describe('DevicelistComponent', () => {
  let component: DevicelistComponent;
  let fixture: ComponentFixture<DevicelistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DevicelistComponent],
      providers: [
        {
          provide: DeviceService,
          useValue: {
            getDeviceList: () => of({ devices: [], pagination: null })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DevicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the expected color for a known device status', () => {
    expect(getDeviceStatusColor(DeviceStatusEnum.AVAILABLE)).toBe('#2dd36f');
  });
});
