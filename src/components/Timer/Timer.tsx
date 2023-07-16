import React, { useState, useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import dayjs from "dayjs"
import { TimerShape } from "./TimerShape"
import TimerFocusForm from "./TimerFocusForm"
import useModal from "../Modals/useModal"
import { TimerAction, TimerState } from "../../types"
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg"

interface ITimer {
  initialTime: number
}

interface IState {
  time: number
  timerState: TimerState
}

interface IAction {
  type: TimerAction
  newTime?: number
}

const buttonVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

function timerReducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "start":
      return {
        ...state,
        timerState: "running",
      }
    case "pause":
      return {
        ...state,
        timerState: "paused",
      }
    case "reset":
      return {
        ...state,
        time: action.newTime || 0,
        timerState: "idle",
      }
    case "tick":
      return {
        ...state,
        time: state.time - 1,
      }
    default:
      return state
  }
}

function useTimer(initialTime: number) {
  const initialState: IState = {
    time: initialTime,
    timerState: "idle",
  }
  const [state, dispatch] = useReducer(timerReducer, initialState)
  const [intervalNum, setIntervalNum] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (state.timerState === "running") {
      clearInterval(intervalNum)

      let timeValue = state.time

      const interval = setInterval(() => {
        if (timeValue <= 0) {
          clearInterval(interval)
          dispatch({ type: "reset", newTime: initialTime })
        } else {
          dispatch({ type: "tick" })
        }
        timeValue--
      }, 1000)

      setIntervalNum(interval)
    } else {
      clearInterval(intervalNum)
    }
  }, [state.timerState])

  return { state, dispatch }
}

function Timer({ initialTime }: ITimer) {
  const { state, dispatch } = useTimer(initialTime)
  const { openTimerSettingsModal } = useModal()
  const minutes = Math.floor(state.time / 60)
  const seconds = state.time - minutes * 60

  return (
    <AnimatePresence>
      <motion.div
        key="timer_component"
        className="max-[320px]:mx-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween" }}
      >
        <TimerFocusForm timerState={state.timerState} />
        <div
          className={`m-auto mt-8 flex aspect-square max-w-xs flex-col justify-center rounded-full border ${
            state.timerState === "idle" ? "border-rose-600" : ""
          }`}
        >
          <TimerShape initialTime={initialTime} currentTime={state.time} />
          <div className="text-center text-8xl font-thin tabular-nums max-[300px]:text-7xl">
            {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
          </div>
        </div>
        <AnimatePresence mode="popLayout">
          {state.timerState !== "running" && (
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
          {state.timerState === "idle" ? (
            <motion.button
              layout
              type="submit"
              onClick={() => dispatch({ type: "start" })}
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
          ) : state.timerState === "running" ? (
            <motion.button
              layout
              type="submit"
              onClick={() => dispatch({ type: "pause" })}
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
                onClick={() => dispatch({ type: "start" })}
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
                onClick={() =>
                  dispatch({ type: "reset", newTime: initialTime })
                }
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
        </AnimatePresence>
        <AnimatePresence>
          {state.timerState !== "running" && <TimerHistory />}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

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
