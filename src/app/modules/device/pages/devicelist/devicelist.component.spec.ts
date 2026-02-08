import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DevicelistComponent } from './devicelist.component';

describe('DevicelistComponent', () => {
  let component: DevicelistComponent;
  let fixture: ComponentFixture<DevicelistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DevicelistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
