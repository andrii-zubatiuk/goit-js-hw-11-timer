class CountdownTimer {
  constructor(config) {
    this.selector = config.selector;
    this.targetDate = config.targetDate;
    this.initRefs();
    this.runTimer();
  }

  initRefs() {
    this.refs = {
      daysClockface: document.querySelector(
        `${this.selector} span[data-value="days"]`,
      ),
      hoursClockface: document.querySelector(
        `${this.selector} span[data-value="hours"]`,
      ),
      minsClockface: document.querySelector(
        `${this.selector} span[data-value="mins"]`,
      ),
      secsClockface: document.querySelector(
        `${this.selector} span[data-value="secs"]`,
      ),
    };
  }

  runTimer() {
    this.updateClockface(this.getDeltaTime()); // это сделал, что бы в интерфейсе не видеть дефолтных "11" пока не пройдет 1 секунда

    setInterval(() => {
      this.updateClockface(this.getDeltaTime());
    }, 1000);
  }

  getDeltaTime() {
    const carrentDate = Date.now();
    const deltaTime = this.targetDate - carrentDate;

    return deltaTime;
  }

  updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.refs.hoursClockface.textContent = `${hours}`;
    this.refs.daysClockface.textContent = `${days}`;
    this.refs.minsClockface.textContent = `${mins}`;
    this.refs.secsClockface.textContent = `${secs}`;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

export default CountdownTimer;
