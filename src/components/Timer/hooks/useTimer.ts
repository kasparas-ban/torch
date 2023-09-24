import { create } from "zustand"
import { TimerState } from "../../../types"
import { createSelectors } from "../../../helpers"

type TimerStoreState = {
  time: number
  initialTime: number
  timerState: TimerState

  break: boolean
  breakTime: number
  longBreakTime: number
  timerCount: number

  interval?: number

  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  endTimer: () => void
  tickTimer: () => void

  setDurations: (
    timerDuration: number,
    breakDuration: number,
    longBreakDuration: number,
  ) => void
}

const DEFAULT_TIME = 25
const DEFAULT_BREAK_TIME = 5
const DEFAULT_LONG_BREAK_TIME = 15

const timerSettings = JSON.parse(
  localStorage.getItem("timer-settings-storage") || "null",
)
const defaultTime = (timerSettings.state.timerDuration ?? DEFAULT_TIME) * 60
const breakTime = (timerSettings.state.breakDuration || DEFAULT_BREAK_TIME) * 60
const longBreakTime =
  (timerSettings.state.longBreakDuration || DEFAULT_LONG_BREAK_TIME) * 60

const useTimerStoreBase = create<TimerStoreState>(set => ({
  time: defaultTime,
  initialTime: defaultTime,
  breakTime: breakTime,
  longBreakTime: longBreakTime,
  timerState: "idle",

  break: false,
  timerCount: 0,

  interval: undefined,

  startTimer: () =>
    set(state => {
      let time = state.time
      const interval = setInterval(() => {
        if (time <= 0) {
          state.endTimer()
        } else {
          state.tickTimer()
          time--
        }
      }, 1000)

      return {
        timerState: "running",
        interval,
      }
    }),
  pauseTimer: () =>
    set(state => {
      clearInterval(state.interval)
      return {
        timerState: "paused",
      }
    }),
  endBreak: () =>
    set(state => {
      clearInterval(state.interval)
      return {
        timerState: "idle",
        time: state.initialTime,
        break: false,
        interval: undefined,
      }
    }),
  endTimer: () =>
    set(state => {
      let time = !state.break
        ? state.timerCount >= 3
          ? state.longBreakTime
          : state.breakTime
        : state.initialTime
      clearInterval(state.interval)
      return {
        timerState: "idle",
        time,
        break: !state.break,
        interval: undefined,
        timerCount: state.timerCount >= 5 ? 0 : state.timerCount + 1,
      }
    }),
  resetTimer: () =>
    set(state => {
      clearInterval(state.interval)
      return {
        timerState: "idle",
        time: state.initialTime,
        break: false,
        interval: undefined,
      }
    }),
  tickTimer: () =>
    set(state => ({
      time: state.time - 1,
    })),

  setDurations: (
    timerDuration: number,
    breakDuration: number,
    longBreakDuration: number,
  ) =>
    set(state => ({
      time: timerDuration < state.time ? timerDuration : state.time,
      initialTime: timerDuration,
      breakTime: breakDuration,
      longBreakTime: longBreakDuration,
    })),
}))

const useTimerStore = createSelectors(useTimerStoreBase)

export default useTimerStore
