import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DailyVitalsPage } from './daily-vitals.page';

describe('Tab2Page', () => {
  let component: DailyVitalsPage;
  let fixture: ComponentFixture<DailyVitalsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyVitalsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyVitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
