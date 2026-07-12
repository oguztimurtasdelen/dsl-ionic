import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { CreateTrainingModalComponent } from './create-training-modal.component';
import { TrainingService } from '../../../training.service';
import { TrainingTypeEnum } from '../../enums/training-type.enum';

describe('CreateTrainingModalComponent', () => {
  let component: CreateTrainingModalComponent;
  let fixture: ComponentFixture<CreateTrainingModalComponent>;
  let trainingService: jasmine.SpyObj<TrainingService>;
  let modalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    trainingService = jasmine.createSpyObj('TrainingService', ['getTrainingLevels']);
    trainingService.getTrainingLevels.and.returnValue(of([]));

    modalController = jasmine.createSpyObj('ModalController', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [CreateTrainingModalComponent],
      providers: [
        { provide: TrainingService, useValue: trainingService },
        { provide: ModalController, useValue: modalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTrainingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start on the training type step', () => {
    expect(component.step).toBe(1);
    expect(component.selectedTrainingType).toBeNull();
  });

  it('should move to the levels step and load levels when a type is selected', () => {
    const trainingType = TrainingTypeEnum.REFLEX;
    trainingService.getTrainingLevels.and.returnValue(of([{ _id: '1', trainingType, trainingLevel: 'Beginner' }]));

    component.selectTrainingType(trainingType);

    expect(component.step).toBe(2);
    expect(component.selectedTrainingType).toBe(trainingType);
    expect(trainingService.getTrainingLevels).toHaveBeenCalledWith(trainingType);
  });
});
