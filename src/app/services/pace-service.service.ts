import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaceService {
  private min: number;
  private sec: number;
  private units: string;

  constructor(min: number | string, sec: number | string, units: string) {
    this.min = typeof min === 'number' ? min : parseInt(min);
    this.sec = typeof sec === 'number' ? sec : parseInt(sec);
    this.units = units;
  }

  display = () => {
    return `${this.min}:${this.sec.toString().padStart(2, '0')} min/${
      this.units
    }`;
  };

  inMin = () => {
    return this.min + this.sec / 60;
  };

  calcPercentage = (percent: number) => {
    const newPaceInMin = (this.inMin() / 100) * (100 - percent) + this.inMin();
    return new PaceService(
      Math.floor(newPaceInMin),
      (newPaceInMin * 60) % 60,
      this.units
    );
  };
}
