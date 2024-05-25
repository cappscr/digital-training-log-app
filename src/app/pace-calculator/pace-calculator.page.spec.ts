import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PaceCalculatorPage } from './pace-calculator.page';

describe('Tab3Page', () => {
  let component: PaceCalculatorPage;
  let fixture: ComponentFixture<PaceCalculatorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaceCalculatorPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PaceCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
