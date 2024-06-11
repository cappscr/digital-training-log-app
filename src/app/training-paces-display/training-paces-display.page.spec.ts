import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TrainingPacesDisplayPage } from './training-paces-display.page';

describe('Tab3Page', () => {
  let component: TrainingPacesDisplayPage;
  let fixture: ComponentFixture<TrainingPacesDisplayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingPacesDisplayPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingPacesDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
