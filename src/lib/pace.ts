interface TrainingPace {
  display(): string
  inMin(): number
  calcPercentage(percent: number): Pace
}

class Pace implements TrainingPace {
  private _min: number
  private _sec: number
  private _units: string
  constructor(min: string | number, sec: string | number, units: string) {
    this._min = typeof min === 'string' ? parseInt(min) : min
    this._sec = typeof sec === 'string' ? parseInt(sec) : sec
    this._units = units
  }
  display = () => {
    return `${this._min}:${this._sec.toString().padStart(2, '0')} min/${
      this._units
    }`
  }
  inMin = () => {
    return this._min + this._sec / 60
  }
  calcPercentage = (percent: number): Pace => {
    const newPaceInMin = (this.inMin() / 100) * (100 - percent) + this.inMin()
    return new Pace(
      `${Math.floor(newPaceInMin)}`,
      `${(newPaceInMin * 60) % 60}`,
      this._units
    )
  }
}

export { Pace }
