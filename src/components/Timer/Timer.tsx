import React, { forwardRef } from "react"
import dayjs from "dayjs"
import { AnimatePresence, motion } from "framer-motion"
import { TimerFocusForm, TimerFocusInfo } from "./TimerFocusForm"
import useTimerForm from "./useTimerForm"
import useTimerStore from "./useTimer"
import { TimerShape } from "./TimerShape"
import useModal from "../Modals/useModal"
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
            layout
            key="timer_focus_info"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.6 },
            }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
          >
            <TimerFocusInfo />
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
            <motion.button
              className="flex items-center rounded-xl px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              whileHover={{ scale: 1.06 }}
              onClick={openTimerSettingsModal}
            >
              <SettingsIcon className="mr-1 h-4 w-4" />
              Settings
            </motion.button>
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
          <div className="flex justify-center space-x-3">
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
              <div className="absolute top-1 right-[13px] font-medium tracking-wide text-white">
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

const TimerClock = forwardRef(() => {
  const time = useTimerStore.use.time()
  const initialTime = useTimerStore.use.initialTime()
  const timerState = useTimerStore.use.timerState()

  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  return (
    <motion.div
      layout
      className={`m-auto mt-8 flex aspect-square max-w-xs flex-col justify-center rounded-full border ${
        timerState === "idle" ? "border-rose-600" : ""
      }`}
    >
      <TimerShape initialTime={initialTime} currentTime={time} />
      <div className="text-center text-8xl font-thin tabular-nums max-[300px]:text-7xl">
        {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
      </div>
    </motion.div>
  )
})

function TimerHistory() {
  const data = [
    {
      timerTime: "25 min",
      focusOn: 'Finish reading "The Shape of Space"',
      progress: "45%",
      difference: "3%",
      startTime: new Date(),
      finishDate: new Date(),
    },
    {
      timerTime: "25 min",
      focusOn: 'Finish reading "The Shape of Space"',
      progress: "45%",
      difference: "3%",
      startTime: new Date(),
      finishDate: new Date(),
    },
    {
      timerTime: "25 min",
      focusOn: 'Finish reading "The Shape of Space"',
      progress: "45%",
      difference: "3%",
      startTime: new Date(),
      finishDate: new Date(),
    },
    {
      timerTime: "25 min",
      focusOn: 'Finish reading "The Shape of Space"',
      progress: "45%",
      difference: "3%",
      startTime: new Date(),
      finishDate: new Date(),
    },
    {
      timerTime: "25 min",
      focusOn: 'Finish reading "The Shape of Space"',
      progress: "45%",
      difference: "3%",
      startTime: new Date(),
      finishDate: new Date(),
    },
  ]

  return (
    <motion.div
      layout
      className="mt-8 mb-4 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className="mx-auto">
        <div className="mx-4 grid grid-cols-[40px_240px_100px_100px_100px_80px] text-gray-500 max-[700px]:grid-cols-[40px_240px_100px_100px] max-[500px]:grid-cols-[20px_auto_auto_auto] max-[500px]:gap-x-3">
          <div className="mb-2 font-semibold text-gray-600"></div>
          <div className="mb-2 font-semibold text-gray-600">Focus on</div>
          <div className="mb-2 font-semibold text-gray-600">Progress</div>
          <div className="mb-2 font-semibold text-gray-600">Time spent</div>
          <div className="mb-2 font-semibold text-gray-600 max-[700px]:hidden">
            Start time
          </div>
          <div className="mb-2 font-semibold text-gray-600 max-[700px]:hidden">
            Finish time
          </div>
          {data.map((row, idx) => (
            <React.Fragment key={idx}>
              <div className="mb-1">{idx + 1}</div>
              <div className="mb-1 mr-3 truncate max-[700px]:mr-2 max-[500px]:mr-0">
                {row.focusOn}
              </div>
              <div className="mb-1">
                {row.progress}
                {` + `}
                <span className="font-bold">{row.difference}</span>
              </div>
              <div className="mb-1">{row.timerTime}</div>
              <div className="mb-1 max-[700px]:hidden">
                {dayjs(row.startTime).format("HH:mm A")}
              </div>
              <div className="mb-1 max-[700px]:hidden">
                {dayjs(row.finishDate).format("HH:mm A")}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Timer
