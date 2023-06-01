import { useState, useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TimerShape } from "./TimerShape"
import {
  SelectTypeFirstField,
  SelectTypeSecondField,
} from "../Modals/SelectInput"
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg"
import { OptionType } from "../../types"
import TimerSettingsModal from "./TimerSettingsModal"

interface ITimer {
  initialTime: number
}

type TimerAction = "start" | "pause" | "reset" | "tick"
type TimerState = "idle" | "paused" | "running"

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
        time: state.time--,
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
  const minutes = Math.floor(state.time / 60)
  const seconds = state.time - minutes * 60

  return (
    <>
      <div className="max-[320px]:mx-2">
        <TimerSettings />
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
          {state.timerState === "idle" ? (
            <motion.button
              layout
              type="submit"
              onClick={() => dispatch({ type: "start" })}
              className="m-auto mt-8 flex h-8 w-24 rounded-full bg-rose-400"
              whileHover={{ scale: 1.06 }}
              variants={buttonVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <div className="m-auto tracking-wide">Start</div>
            </motion.button>
          ) : state.timerState === "running" ? (
            <motion.button
              layout
              type="submit"
              onClick={() => dispatch({ type: "pause" })}
              className="m-auto mt-8 flex h-8 w-24 rounded-full bg-rose-400"
              whileHover={{ scale: 1.06 }}
              variants={buttonVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <div className="m-auto tracking-wide">Pause</div>
            </motion.button>
          ) : (
            <div className="flex justify-center space-x-3">
              <motion.button
                layout
                type="submit"
                onClick={() => dispatch({ type: "start" })}
                className="mt-8 flex h-8 w-24 rounded-full bg-rose-400"
                whileHover={{ scale: 1.06 }}
                variants={buttonVariants}
                initial="initial"
                animate="default"
                exit="close"
              >
                <div className="m-auto tracking-wide">Continue</div>
              </motion.button>
              <motion.button
                layout
                type="submit"
                onClick={() =>
                  dispatch({ type: "reset", newTime: initialTime })
                }
                className="mt-8 flex h-8 w-24 rounded-full bg-rose-400"
                whileHover={{ scale: 1.06 }}
                variants={buttonVariants}
                initial="initial"
                animate="default"
                exit="close"
              >
                <div className="m-auto tracking-wide">Stop</div>
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

type FocusType = "ALL" | "TASKS" | "GOALS" | "DREAMS"

const focusTypeOptions = [
  { label: "All", value: "ALL" as FocusType },
  { label: "Tasks", value: "TASKS" as FocusType },
  { label: "Goals", value: "GOALS" as FocusType },
  { label: "Dreams", value: "DREAMS" as FocusType },
]

function TimerSettings() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
  const [focusOn, setFocusOn] = useState<OptionType | null>()
  const [focusType, setFocusType] = useState<FocusType | null>(
    focusTypeOptions[0].value
  )

  return (
    <div className="mx-auto mt-8 max-w-sm">
      <div className="mb-1 ml-2">Focus on</div>
      <div className="flex [&>div:first-child]:w-full">
        <SelectTypeFirstField
          value={null}
          onChange={option => setFocusOn(option)}
          options={[]}
          isClearable
        />
        <SelectTypeSecondField
          value={focusTypeOptions.find(option => option.value === focusType)}
          onChange={option => option && setFocusType(option.value)}
          options={focusTypeOptions.filter(
            option => option.value !== focusType
          )}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <motion.button
          className="flex items-center rounded-xl bg-gray-200 px-3 py-1"
          whileHover={{ scale: 1.06 }}
          onClick={() => setSettingsModalOpen(true)}
        >
          <SettingsIcon className="mr-1 h-4 w-4" />
          Settings
        </motion.button>
      </div>
      <AnimatePresence>
        {settingsModalOpen && (
          <TimerSettingsModal closeModal={() => setSettingsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Timer
