import { forwardRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useTimerStore from "./useTimer"
import useTimerForm from "./useTimerForm"
import { TimerShape } from "./TimerShape"
import useModal from "../Modals/useModal"
import TimerHistory from "./TimerHistory"
import { TimerFocusForm, TimerFocusInfo } from "./TimerFocusForm"
import { GeneralModal } from "../Modals/GeneralModal/GeneralModal"
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg"

const buttonVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

function Timer() {
  const timerState = useTimerStore.use.timerState()
  const startTimer = useTimerStore.use.startTimer()
  const pauseTimer = useTimerStore.use.pauseTimer()
  const resetTimer = useTimerStore.use.resetTimer()

  const { openTimerSettingsModal } = useModal()
  const { focusOn } = useTimerForm()

  return (
    <motion.div
      className="max-[320px]:mx-2"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "tween" }}
    >
      <AnimatePresence mode="popLayout">
        <TimerFocusForm key="timer_focus_form" />

        {focusOn && (
          <motion.div
            key={`${focusOn.type}_${focusOn.value}_info`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <TimerFocusInfo key="timer_focus_info" focusOn={focusOn} />
          </motion.div>
        )}

        <TimerClock key="timer_clock" />

        {timerState !== "running" && (
          <motion.div
            layout
            key="timer_settings"
            className="mt-2 flex justify-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.01 } }}
          >
            <GeneralModal>
              <motion.div
                className="flex items-center rounded-xl px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                whileHover={{ scale: 1.06 }}
                onClick={openTimerSettingsModal}
              >
                <SettingsIcon className="mr-1 h-4 w-4" />
                Settings
              </motion.div>
            </GeneralModal>
          </motion.div>
        )}
        {timerState === "idle" ? (
          <motion.button
            layout
            type="submit"
            key="timer_start"
            onClick={startTimer}
            className="bg-multi-color m-auto mt-4 flex h-8 w-24 rounded-full px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
            whileHover={{ scale: 1.06 }}
            variants={buttonVariants}
            initial="initial"
            animate="default"
            exit="close"
          >
            <div className="m-auto flex h-full items-center font-medium tracking-wider text-white">
              Start
            </div>
          </motion.button>
        ) : timerState === "running" ? (
          <motion.button
            layout
            type="submit"
            key="timer_pause"
            onClick={pauseTimer}
            className="m-auto mt-4 flex h-8 w-24 rounded-full border border-gray-400"
            whileHover={{ scale: 1.06 }}
            variants={buttonVariants}
            initial="initial"
            animate="default"
            exit="close"
          >
            <div className="m-auto font-semibold tracking-wide text-gray-600">
              Pause
            </div>
          </motion.button>
        ) : (
          <div
            key="timer_continue_panel"
            className="flex justify-center space-x-3"
          >
            <motion.button
              layout
              type="submit"
              key="timer_continue"
              onClick={startTimer}
              className="bg-multi-color relative mt-4 flex h-8 w-24 rounded-full px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
              whileHover={{ scale: 1.06 }}
              variants={buttonVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <div className="absolute right-[13px] top-1 font-medium tracking-wide text-white">
                Continue
              </div>
            </motion.button>
            <motion.button
              layout
              type="submit"
              key="timer_reset"
              onClick={resetTimer}
              className="mt-4 flex h-8 w-24 rounded-full border border-gray-400"
              whileHover={{ scale: 1.06 }}
              variants={buttonVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <div className="m-auto font-semibold tracking-wide text-gray-600">
                Stop
              </div>
            </motion.button>
          </div>
        )}
        {timerState !== "running" && (
          <motion.div layout key="timer_history">
            <TimerHistory />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const TimerClock = forwardRef<HTMLDivElement>((_, ref) => {
  const time = useTimerStore.use.time()
  const timerState = useTimerStore.use.timerState()

  const initialTimerTime = useTimerStore.use.initialTime()
  const isBreakActive = useTimerStore.use.break()
  const isLongBreakActive = useTimerStore.use.timerCount() >= 4
  const longBreakTime = useTimerStore.use.longBreakTime()
  const breakTime = useTimerStore.use.breakTime()
  const initialTime = isBreakActive
    ? isLongBreakActive
      ? longBreakTime
      : breakTime
    : initialTimerTime

  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  return (
    <motion.div
      layout
      ref={ref}
      className={`m-auto mt-8 flex aspect-square max-w-xs flex-col justify-center rounded-full border ${
        isBreakActive && timerState === "idle"
          ? "border-blue-400"
          : timerState === "idle"
          ? "border-rose-600"
          : ""
      }`}
    >
      <TimerShape
        initialTime={initialTime}
        currentTime={time}
        isBreakActive={isBreakActive}
      />
      <div className="text-center text-8xl font-thin tabular-nums max-[300px]:text-7xl">
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </div>
    </motion.div>
  )
})

export default Timer
