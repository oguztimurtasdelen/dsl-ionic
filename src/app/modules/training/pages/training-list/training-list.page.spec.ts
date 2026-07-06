import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingListPage } from './training-list.page';

describe('TrainingListPage', () => {
  let component: TrainingListPage;
  let fixture: ComponentFixture<TrainingListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loading state', () => {
    expect(component.loading).toBeTrue();
    expect(component.error).toBeNull();
  });

  it('should filter trainings by selected type and status', () => {
    component.allTrainings = [
      {
        _id: '1',
        profile: 'p1',
        device: 'd1',
        trainingType: 'REFLEX' as any,
        trainingStatus: 'COMPLETED' as any,
        trainingProgram: 'program-1',
        trainingResult: 'ok',
        trainingMetrics: 'metrics',
        createdAt: '2024-01-01T00:00:00.000Z'
      },
      {
        _id: '2',
        profile: 'p2',
        device: 'd2',
        trainingType: 'SPEED' as any,
        trainingStatus: 'READY' as any,
        trainingProgram: 'program-2',
        trainingResult: 'pending',
        trainingMetrics: 'metrics',
        createdAt: '2024-01-02T00:00:00.000Z'
      }
    ] as any;

    component.selectedTrainingType = 'REFLEX';
    component.selectedTrainingStatus = 'COMPLETED';
    component.applyFilters();

    expect(component.trainingList.length).toBe(1);
    expect(component.trainingList[0]._id).toBe('1');
  });
});
