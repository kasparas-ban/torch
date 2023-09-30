import { useEffect } from "react"
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import { createSelectors, formatDate } from "../../../helpers"
import { TimerState } from "../../../types"
import useTimerForm from "./useTimerForm"

type TimerStoreState = {
  time: number
  initialTime: number
  timerState: TimerState

  sessionStartTime?: Date
  sessionEndTime?: Date

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

const useTimerStoreBase = create<TimerStoreState>()(
  subscribeWithSelector(set => ({
    time: defaultTime,
    initialTime: defaultTime,
    breakTime: breakTime,
    longBreakTime: longBreakTime,
    timerState: "idle",

    sessionStartTime: undefined,
    sessionEndTime: undefined,

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
          sessionStartTime: new Date(),
        }
      }),
    pauseTimer: () =>
      set(state => {
        clearInterval(state.interval)
        return {
          timerState: "paused",
          sessionEndTime: new Date(),
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
          sessionEndTime: new Date(),
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
          sessionEndTime: new Date(),
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
          sessionEndTime: new Date(),
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
  })),
)

const useTimerStore = createSelectors(useTimerStoreBase)

export const useTimerListener = () => {
  const { focusOn } = useTimerForm()
  // const { mutate } = useAddTimerRecord()

  useEffect(() => {
    const timerStateListener = useTimerStore.subscribe(
      state => state,
      state => {
        if (
          (state.timerState === "idle" || state.timerState === "paused") &&
          state.sessionStartTime &&
          state.sessionEndTime
        ) {
          const startTime = formatDate(state.sessionStartTime)
          const endTime = formatDate(state.sessionEndTime)
          // mutate({ startTime, endTime, itemID: focusOn?.value })
        }
      },
    )

    return () => timerStateListener()
  }, [])
}

export default useTimerStore
