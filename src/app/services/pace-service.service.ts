import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaceService {
  private min: number = 0;
  private sec: number = 0;
  private units: string = 'min/mi';

  set(pace: string, units: string) {
    const min = pace.split(':')[0];
    const sec = pace.split(':')[1];
    this.min = parseInt(min);
    this.sec = parseInt(sec);
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

  calcPercentage(percent: number): PaceService {
    const newPaceInMin = (this.inMin() / 100) * (100 - percent) + this.inMin();
    const newPace = new PaceService();
    newPace.set(
      `${Math.floor(newPaceInMin)}:${(newPaceInMin * 60) % 60}`,
      this.units
    );
    return newPace;
  }
}
