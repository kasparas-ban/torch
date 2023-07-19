import { create } from "zustand"
import { TimerState } from "../../types"
import { createSelectors } from "../../helpers"

type TimerStoreState = {
  time: number
  initialTime: number
  timerState: TimerState

  interval: any

  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  tickTimer: () => void
}

const DEFAULT_TIME = 60 // 25 * 60

const useTimerStoreBase = create<TimerStoreState>(set => ({
  time: DEFAULT_TIME,
  initialTime: DEFAULT_TIME,
  timerState: "idle",

  interval: undefined,

  startTimer: () =>
    set(state => {
      let time = state.time
      const interval = setInterval(() => {
        if (time <= 0) {
          state.resetTimer()
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
  resetTimer: () =>
    set(state => {
      clearInterval(state.interval)
      return {
        timerState: "idle",
        time: state.initialTime,
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
