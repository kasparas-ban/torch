import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useTimerForm, { FocusType } from "./useTimerForm"
import useTimerStore from "./useTimer"
import {
  SelectTypeFirstField,
  SelectTypeSecondField,
} from "../Inputs/SelectField"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
import { ReactComponent as TimerBoldIcon } from "../../assets/timer_bold.svg"

const focusTypeOptions = [
  { label: "All", value: "ALL" as FocusType },
  { label: "Tasks", value: "TASKS" as FocusType },
  { label: "Goals", value: "GOALS" as FocusType },
  { label: "Dreams", value: "DREAMS" as FocusType },
]

export const TimerFocusForm = forwardRef(() => {
  const timerState = useTimerStore.use.timerState()
  const { focusOn, setFocusOn, focusType, setFocusType, getFocusOptions } =
    useTimerForm()

  return (
    <AnimatePresence mode="popLayout">
      {timerState !== "running" && (
        <motion.div
          layout
          className="mx-auto mt-8 max-w-sm max-[400px]:mx-4 max-[320px]:mx-0"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.2 } }}
        >
          <motion.div layout key="timer_focus_input">
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
                value={focusTypeOptions.find(
                  option => option.value === focusType
                )}
                onChange={option => option && setFocusType(option.value)}
                options={focusTypeOptions.filter(
                  option => option.value !== focusType
                )}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export const TimerFocusInfo = forwardRef(() => {
  const { focusOn } = useTimerForm()

  return (
    <motion.div layout className="mt-4 flex flex-col justify-center">
      <div className="text-center text-xl font-semibold">{focusOn?.label}</div>
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
  )
})
