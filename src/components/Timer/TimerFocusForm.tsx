import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TimerState, OptionType } from "../../types"
import {
  SelectTypeFirstField,
  SelectTypeSecondField,
} from "../Inputs/SelectField"
import { ReactComponent as TimerBoldIcon } from "../../assets/timer_bold.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"

type FocusType = "ALL" | "TASKS" | "GOALS" | "DREAMS"

const focusTypeOptions = [
  { label: "All", value: "ALL" as FocusType },
  { label: "Tasks", value: "TASKS" as FocusType },
  { label: "Goals", value: "GOALS" as FocusType },
  { label: "Dreams", value: "DREAMS" as FocusType },
]

function TimerFocusForm({ timerState }: { timerState: TimerState }) {
  const [focusOn, setFocusOn] = useState<OptionType | null>()
  const [focusType, setFocusType] = useState<FocusType | null>(
    focusTypeOptions[0].value
  )

  const getFocusOptions = (inputValue: string) =>
    new Promise<OptionType[]>(resolve => {
      setTimeout(() => {
        resolve([{ label: 'Finish reading "The Shape of Space"', value: 123 }])
      }, 1000)
    })

  return (
    <div className="mx-auto mt-8 max-w-sm max-[400px]:mx-4 max-[320px]:mx-0">
      <motion.div
        animate={{
          opacity: timerState !== "running" ? 1 : 0,
          height: timerState !== "running" ? "auto" : 0,
        }}
      >
        <div className="mb-1 ml-2">Focus on</div>
        <div className="flex [&>div:first-child]:w-full">
          <SelectTypeFirstField
            value={focusOn}
            onChange={option => setFocusOn(option)}
            options={[]}
            loadOptions={getFocusOptions}
            defaultOptions
            isClearable
            cacheOptions
          />
          <SelectTypeSecondField
            value={focusTypeOptions.find(option => option.value === focusType)}
            onChange={option => option && setFocusType(option.value)}
            options={focusTypeOptions.filter(
              option => option.value !== focusType
            )}
          />
        </div>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {focusOn && (
          <motion.div
            layout
            className="mt-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.25, delay: 0.1 },
            }}
            exit={{ opacity: 0, y: 0, transition: { duration: 0.04 } }}
            transition={{ type: "tween" }}
          >
            <div className="text-center text-xl font-semibold">
              {focusOn.label}
            </div>
            <div className="flex justify-center">
              <div className="text-6xl font-bold">45%</div>
              <div className="mt-1.5 ml-1.5 flex flex-col gap-1">
                <div className="flex gap-2">
                  <TimerBoldIcon />
                  <span className="font-semibold">6 h</span>
                  spent
                </div>
                <div className="flex gap-2">
                  <TimerIcon />
                  <span className="font-semibold">4.5 h</span>
                  left
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TimerFocusForm
