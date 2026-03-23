import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingDetailPage } from './training-detail.page';

describe('TrainingDetailPage', () => {
  let component: TrainingDetailPage;
  let fixture: ComponentFixture<TrainingDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
