import { forwardRef } from "react"
import { motion } from "framer-motion"
import { ItemOptionType } from "@/types"
import { formatPercentages, formatTimeSpent } from "@/helpers"
import { ReactComponent as TimerBoldIcon } from "../../../assets/timer_bold.svg"
import { ReactComponent as TimerIcon } from "../../../assets/navigation_icons/timer.svg"

const TimerFocusInfo = forwardRef<HTMLDivElement, { focusOn: ItemOptionType }>(
  ({ focusOn }, ref) => {
    const info =
      focusOn.type === "TASK" ? (
        <TaskInfo focusOn={focusOn} />
      ) : (
        <ParentInfo focusOn={focusOn} />
      )

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
        {info}
      </motion.div>
    )
  },
)

const TaskInfo = ({ focusOn }: { focusOn: ItemOptionType }) => {
  const showProgress = !!focusOn.duration
  const timeLeft =
    focusOn.duration && focusOn.timeSpent
      ? focusOn.duration - focusOn.timeSpent
      : undefined

  return (
    <motion.div layout className="flex flex-row justify-center gap-2">
      {showProgress && (
        <div className="text-6xl font-bold">
          {formatPercentages(focusOn.progress)}
          <span className="text-5xl">%</span>
        </div>
      )}
      <div className="mt-1.5 flex flex-col justify-evenly gap-1">
        <div className="flex gap-1">
          <TimerBoldIcon className="w-5" />
          <span className="font-semibold">
            {formatTimeSpent(focusOn.timeSpent ?? 0)}
          </span>
          <span className="text-gray-600">spent</span>
        </div>
        {timeLeft && (
          <div className="flex gap-1">
            <TimerIcon className="w-5" />
            <span className="font-semibold">{formatTimeSpent(timeLeft)}</span>
            <span className="text-gray-600">left</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const ParentInfo = ({ focusOn }: { focusOn: ItemOptionType }) => {
  const showProgress = !!focusOn.duration
  const timeLeft =
    focusOn.duration && focusOn.timeSpent
      ? focusOn.duration - focusOn.timeSpent
      : undefined

  return (
    <motion.div layout className="flex justify-center gap-2">
      {showProgress && (
        <div className="flex items-center text-4xl font-bold max-sm:text-center sm:flex sm:items-center sm:text-6xl">
          {formatPercentages(focusOn.progress)}
          <span className="text-3xl">%</span>
        </div>
      )}
      <div className="mt-1.5 flex flex-col justify-evenly gap-1 max-sm:w-fit max-sm:items-start">
        {focusOn.timeSpent !== undefined && (
          <div className="flex gap-2">
            <TimerBoldIcon className="w-5" />
            <span className="font-semibold">
              {formatTimeSpent(focusOn.timeSpent)}
            </span>
            <span className="text-gray-600">{`spent${
              focusOn.containsTasks ? " on tasks" : ""
            }`}</span>
          </div>
        )}
        {focusOn.containsTasks && focusOn.totalTimeSpent !== undefined && (
          <div className="flex gap-2">
            <TimerBoldIcon className="w-5" />
            <span className="font-semibold">
              {formatTimeSpent(focusOn.totalTimeSpent)}
            </span>
            <span className="text-gray-600">spent in total</span>
          </div>
        )}
        {!!timeLeft && (
          <div className="flex gap-2">
            <TimerIcon className="w-5" />
            <span className="font-semibold">{formatTimeSpent(timeLeft)}</span>
            <span className="text-gray-600">{`left ${
              focusOn.totalTimeSpent ? "on tasks" : ""
            }`}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TimerFocusInfo
