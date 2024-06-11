import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectCustomEvent, ToggleCustomEvent } from '@ionic/angular';
import { PaceService } from '../services/pace-service.service';

@Component({
  selector: 'app-pace-calculator-form',
  templateUrl: './pace-calculator-form.component.html',
  styleUrls: ['./pace-calculator-form.component.scss'],
})
export class PaceCalculatorFormComponent {
  protected pace: string | null = null;
  private paceUnits = 'min/mi';
  private selectedPercentages: number[] = [];
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
  constructor(private paceSerivce: PaceService, private router: Router) {}

  onPaceChange(pace: string) {
    this.pace = pace;
    this.paceSet = Boolean(this.pace);
  }

  onUnitsSelect(e: SelectCustomEvent | null) {
    if (e?.detail.value) {
      this.paceUnits = e?.detail.value;
    }
  }

  onToggle = (e: ToggleCustomEvent) => {
    const toggledPercentage = parseInt(e?.detail.value);
    if (e?.detail.checked) {
      this.selectedPercentages.push(toggledPercentage);
    } else {
      const indexToSplice = this.selectedPercentages.indexOf(toggledPercentage);
      this.selectedPercentages.splice(indexToSplice, 1);
    }
  };

  onCalculate = () => {
    const calculatedTrainingPaces: TrainingPace[] = [];

    this.paceSerivce.set(this.pace as string, this.paceUnits);
    this.selectedPercentages.forEach((percentage) => {
      calculatedTrainingPaces.push({
        percent: percentage,
        pace: this.paceSerivce.calcPercentage(percentage),
      });
    });
    // route to new component passing calculatedTrainingPaces as @input
    this.router.navigate(['tabs/training-paces']);
    //return calculatedTrainingPaces;
  };
}

interface TrainingPace {
  percent: string | number;
  pace: PaceService;
}
