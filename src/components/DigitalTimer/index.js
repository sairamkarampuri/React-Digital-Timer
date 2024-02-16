// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
    isTimerRunning: false,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecereseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitControler = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="set-timer-container">
        <p className="set-timer-text">Set Timer Limit</p>
        <div className="set-timer-button-setion">
          <button
            className="setting-time"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onDecereseTimerLimitInMinutes}
          >
            -
          </button>
          <p className="changed-time">{timerLimitInMinutes}</p>
          <button
            className="setting-time"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTImer = () => {
    this.clearTimerInterval()
    this.setState({
      timerLimitInMinutes: 25,
      timeElapsedInSeconds: 0,
      isTimerRunning: false,
    })
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-container">
        <div className="start-reset-section">
          <button
            className="control-button start-or-pause-button"
            type="button"
            onClick={this.onStartOrPauseTimer}
          >
            <img
              className="control-img"
              src={startOrPauseImgUrl}
              alt={startOrPauseAltText}
            />
            <p className="controler-name">
              {isTimerRunning ? 'Pause' : 'Start'}
            </p>
          </button>
        </div>
        <div className="start-reset-section">
          <button
            className="control-button"
            type="button"
            onClick={this.onResetTImer}
          >
            <img
              className="control-img"
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
          </button>
          <p className="controler-name">Reset</p>
        </div>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalReamaingSeconds = timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalReamaingSeconds / 60)
    const seconds = Math.floor(totalReamaingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  // Main render Method
  render() {
    const {isTimerRunning} = this.state

    // const labelText = isTimerRunning ? "Running" : "Paused"

    return (
      <div className="bg-container">
        <div className="main-container">
          <div className="app-heading-container">
            <h1 className="heading">Digital Timer</h1>
          </div>
          <div className="app-working-container">
            <div className="bg-img-section">
              <div className="timer-container">
                <h1 className="timer">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="timer-status-text">
                  {isTimerRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="controls-section">
              {this.renderTimerController()}
              {this.renderTimerLimitControler()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
