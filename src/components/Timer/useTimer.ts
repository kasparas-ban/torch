import { create } from "zustand"
import { TimerState } from "../../types"
import { createSelectors } from "../../helpers"

// TimerState = "idle" | "paused" | "running"
// Timer State

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
}

const DEFAULT_TIME = 10 // 25 * 60
const DEFAULT_BREAK_TIME = 5 // 25 * 60
const DEFAULT_LONG_BREAK_TIME = 7 // 25 * 60

const useTimerStoreBase = create<TimerStoreState>(set => ({
  time: DEFAULT_TIME,
  initialTime: DEFAULT_TIME,
  breakTime: DEFAULT_BREAK_TIME,
  longBreakTime: DEFAULT_LONG_BREAK_TIME,
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
}))

const useTimerStore = createSelectors(useTimerStoreBase)

export default useTimerStore
