import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pace-picker',
  templateUrl: './pace-picker.component.html',
  styleUrls: ['./pace-picker.component.scss'],
})
export class PacePickerComponent {
  protected availableMinValues = [3, 4, 5, 6, 7, 8];
  protected availableSecValues = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ];
  @Input({ required: true }) modalTrigger = '';
  @Output() paceValue = new EventEmitter<string>();
  currentMinValue = '3';
  currentSecValue = '0';
  currentPaceValue = '3:00';

  constructor() {}

  onIonChange(event: CustomEvent, context: string) {
    const newValue = event.detail.value;
    if (context === 'min') {
      this.currentMinValue = newValue;
    } else if (context === 'sec') {
      this.currentSecValue = newValue;
    }
    this.currentPaceValue = `${this.currentMinValue}:${this.currentSecValue}`;
  }

  onDidDismiss() {
    this.paceValue.emit(this.currentPaceValue);
  }
}
