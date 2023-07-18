import { create } from "zustand"
import { OptionType } from "../../types"

export type FocusType = "ALL" | "TASKS" | "GOALS" | "DREAMS"

type TimerFormStoreState = {
  focusOn: OptionType | null
  focusType: FocusType
  setFocusOn: (focus: OptionType | null) => void
  setFocusType: (focus: FocusType) => void
  getFocusOptions: () => Promise<OptionType[]>
}

const useTimerFormStoreBase = create<TimerFormStoreState>(set => ({
  focusOn: null,
  focusType: "GOALS",
  setFocusOn: (focusOn: OptionType | null) => set(() => ({ focusOn })),
  setFocusType: (focusType: FocusType) => set(() => ({ focusType })),
  getFocusOptions: async () => {
    return new Promise<OptionType[]>(resolve => {
      setTimeout(() => {
        resolve([{ label: 'Finish reading "The Shape of Space"', value: 123 }])
      }, 1000)
    })
  },
}))

const useTimerForm = () => ({
  focusOn: useTimerFormStoreBase(state => state.focusOn),
  focusType: useTimerFormStoreBase(state => state.focusType),
  setFocusOn: useTimerFormStoreBase(state => state.setFocusOn),
  setFocusType: useTimerFormStoreBase(state => state.setFocusType),
  getFocusOptions: useTimerFormStoreBase(state => state.getFocusOptions),
})

export default useTimerForm
