import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  SelectTypeFirstField,
  SelectTypeSecondField,
} from "../../Inputs/SelectField"
import { useItemsList } from "@/API/itemAPI"
import { getItemsByType } from "@/API/helpers"
import useTimerStore from "../hooks/useTimer"
import { toPercent } from "../../../helpers"
import useTimerForm, { FocusType } from "../hooks/useTimerForm"
import { GroupedOptionType, ItemOptionType } from "../../../types"

const focusTypeOptions = [
  { label: "All", value: "ALL" as FocusType },
  { label: "Tasks", value: "TASKS" as FocusType },
  { label: "Goals", value: "GOALS" as FocusType },
  { label: "Dreams", value: "DREAMS" as FocusType },
]

const TimerFocusForm = forwardRef<HTMLDivElement>((_, ref) => {
  const timerState = useTimerStore.use.timerState()
  const { focusOn, setFocusOn, focusType, setFocusType } = useTimerForm()
  const { data } = useItemsList()

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
                options={getItemsByType({
                  itemData: data,
                  focusType,
                  grouped: focusType === "TASKS" || focusType === "GOALS",
                })}
                formatOptionLabel={optionLabel}
                formatGroupLabel={groupLabel}
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

export default TimerFocusForm
