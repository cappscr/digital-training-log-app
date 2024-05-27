import { Component, Input } from '@angular/core';
import { InputCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-pace-calculator-form',
  templateUrl: './pace-calculator-form.component.html',
  styleUrls: ['./pace-calculator-form.component.scss'],
})
export class PaceCalculatorFormComponent {
  private paceMin: number = 0;
  private paceSec: number = 0;
  paceSet = Boolean(this.paceMin && this.paceSec);
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

  onMinInput(e: InputCustomEvent | null) {
    if (e?.detail.value) {
      this.paceMin = parseInt(e?.detail.value as string);
    } else {
      this.paceMin = 0;
    }
    this.paceSet = Boolean(this.paceMin && this.paceSec);
  }

  onSecInput(e: InputCustomEvent | null) {
    if (e?.detail.value) {
      this.paceSec = parseInt(e?.detail.value as string);
    } else {
      this.paceSec = 0;
    }
    this.paceSet = Boolean(this.paceMin && this.paceSec);
  }
}
