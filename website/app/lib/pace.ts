interface Pace {
  min: number;
  sec: number;
  units: string;
}

class Pace {
  constructor(min: string | number, sec: string | number, units: string) {
    this.min = typeof min === "number" ? min : parseInt(min);
    this.sec = typeof sec === "number" ? sec : parseInt(sec);
    this.units = units;
  }
  display = () => {
    return `${this.min}:${this.sec.toString().padStart(2, "0")} ${this.units}`;
  };
  inMin = () => {
    return this.min + this.sec / 60;
  };
  calcPercentage = (percent: number) => {
    const newPaceInMin = (this.inMin() / 100) * (100 - percent) + this.inMin();
    return new Pace(
      Math.floor(newPaceInMin),
      Math.round((newPaceInMin * 60) % 60),
      this.units,
    );
  };
}

export { Pace };
