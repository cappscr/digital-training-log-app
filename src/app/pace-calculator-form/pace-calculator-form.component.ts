import { Component } from '@angular/core';
import { SelectCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-pace-calculator-form',
  templateUrl: './pace-calculator-form.component.html',
  styleUrls: ['./pace-calculator-form.component.scss'],
})
export class PaceCalculatorFormComponent {
  protected pace: string | null = null;
  private paceUnits = 'min/mi';
  paceSet = Boolean(this.pace);
  trainingPercentages = [
    '70',
    '80',
    '85',
    '87.5',
    '90',
    '92',
    '95',
    '97',
    '103',
    '105',
    '108',
    '110',
  ];

  onPaceChange(pace: string) {
    this.pace = pace;
    this.paceSet = Boolean(this.pace);
  }

  onUnitsSelect(e: SelectCustomEvent | null) {
    if (e?.detail.value) {
      this.paceUnits = e?.detail.value;
    }
  }
}
