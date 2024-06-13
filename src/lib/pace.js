class Pace {
  constructor(min, sec, units) {
    this.min = parseInt(min)
    this.sec = parseInt(sec)
    this.units = units
  }
  display = () => {
    return `${this.min}:${this.sec.toString().padStart(2, '0')} min/${
      this.units
    }`
  }
  inMin = () => {
    return this.min + this.sec / 60
  }
  calcPercentage = (percent) => {
    const newPaceInMin = (this.inMin() / 100) * (100 - percent) + this.inMin()
    return new Pace(
      Math.floor(newPaceInMin),
      (newPaceInMin * 60) % 60,
      this.units
    )
  }
}

export { Pace }
