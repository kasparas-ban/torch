import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TimerSettingsStoreState {
  timerDuration: number
  breakDuration: number
  longBreakDuration: number

  setTimerDuration: (duration: number) => void
  setBreakDuration: (duration: number) => void
  setLongBreakDuration: (duration: number) => void

  setDurations: (
    timerDuration: number,
    breakDuration: number,
    longBreakDuration: number,
  ) => void
}

const useTimerSettings = create<TimerSettingsStoreState>()(
  persist(
    set => ({
      timerDuration: 25, // 25 min
      breakDuration: 5, // 5 min
      longBreakDuration: 15, // 15 min

      setTimerDuration: (duration: number) => set({ timerDuration: duration }),
      setBreakDuration: (duration: number) => set({ breakDuration: duration }),
      setLongBreakDuration: (duration: number) =>
        set({ longBreakDuration: duration }),

      setDurations: (
        timerDuration: number,
        breakDuration: number,
        longBreakDuration: number,
      ) =>
        set({
          timerDuration,
          breakDuration,
          longBreakDuration,
        }),
    }),
    {
      name: "timer-settings-storage",
    },
  ),
)

export default useTimerSettings
