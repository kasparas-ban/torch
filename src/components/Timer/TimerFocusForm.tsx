import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useTimerForm, { FocusType } from "./useTimerForm"
import useTimerStore from "./useTimer"
import {
  SelectTypeFirstField,
  SelectTypeSecondField,
} from "../../components/Inputs/SelectField"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
import { ReactComponent as TimerBoldIcon } from "../../assets/timer_bold.svg"
import { GroupedOptionType, ItemOptionType } from "../../types"
import { getItemsByType } from "../../API/api"
import { formatPercentages, formatTimeSpent, toPercent } from "../../helpers"

const focusTypeOptions = [
  { label: "All", value: "ALL" as FocusType },
  { label: "Tasks", value: "TASKS" as FocusType },
  { label: "Goals", value: "GOALS" as FocusType },
  { label: "Dreams", value: "DREAMS" as FocusType },
]

export const TimerFocusForm = forwardRef<HTMLDivElement>((_, ref) => {
  const timerState = useTimerStore.use.timerState()
  const { focusOn, setFocusOn, focusType, setFocusType } = useTimerForm()

  return (
    <AnimatePresence mode="popLayout">
      {timerState !== "running" && (
        <motion.div
          layout
          ref={ref}
          className="mx-auto max-w-sm max-[400px]:mx-4 max-[320px]:mx-0"
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
                key={`${focusType}_focus_item`}
                value={focusOn}
                onChange={option => setFocusOn(option)}
                loadOptions={input =>
                  getItemsByType(
                    input,
                    focusType,
                    focusType === "TASKS" || focusType === "GOALS",
                  )
                }
                formatOptionLabel={optionLabel}
                formatGroupLabel={groupLabel}
                defaultOptions
                isClearable
              />
              <SelectTypeSecondField
                value={focusTypeOptions.find(
                  option => option.value === focusType,
                )}
                onChange={option => option && setFocusType(option.value)}
                options={focusTypeOptions.filter(
                  option => option.value !== focusType,
                )}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export const TimerFocusInfo = forwardRef<
  HTMLDivElement,
  { focusOn: ItemOptionType }
>(({ focusOn }, ref) => {
  const timeLeft =
    focusOn.type === "TASK"
      ? focusOn.duration && focusOn.timeSpent
        ? focusOn.duration?.subtract({
            hours: focusOn.timeSpent.hour,
            minutes: focusOn.timeSpent.minute,
            seconds: focusOn.timeSpent.second,
          })
        : undefined
      : focusOn.timeLeft

  return (
    <motion.div
      layout
      ref={ref}
      className="relative mt-4 flex flex-col justify-center"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.6 },
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.1 } }}
    >
      <motion.div
        layout
        className="mx-auto max-w-2xl px-6 text-center text-xl font-semibold [text-wrap:balance]"
      >
        {focusOn?.label}
      </motion.div>
      <motion.div layout className="flex justify-center">
        {focusOn.progress !== undefined && (
          <div className="text-6xl font-bold">
            {formatPercentages(focusOn.progress)}
          </div>
        )}
        {focusOn.timeSpent && (
          <div className="ml-1.5 mt-1.5 flex flex-col justify-evenly gap-1">
            <div className="flex gap-2">
              <TimerBoldIcon />
              <span className="font-semibold">
                {formatTimeSpent(focusOn.timeSpent)}
              </span>
              <span className="text-gray-600">spent</span>
            </div>
            {timeLeft && (
              <div className="flex gap-2">
                <TimerIcon />
                <span className="font-semibold">
                  {formatTimeSpent(timeLeft)}
                </span>
                <span className="text-gray-600">left</span>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
})

const optionLabel = (
  option: ItemOptionType,
  { context }: { context: "menu" | "value" },
) => {
  return (
    <div className="flex w-full items-center gap-2">
      {context === "menu" ? (
        <>
          <div className="shrink-0 basis-10 text-center font-bold text-rose-500">
            {toPercent(option.progress)}
          </div>
          <div>{option.label}</div>
        </>
      ) : (
        <div>{option.label}</div>
      )}
    </div>
  )
}

const groupLabel = (data: GroupedOptionType) => <div>{data.label}</div>
