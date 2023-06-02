import { useState, useEffect, useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TimerShape } from "./TimerShape"
import {
  SelectTypeFirstField,
  SelectTypeSecondField,
} from "../Modals/SelectInput"
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg"
import { ReactComponent as TimerBoldIcon } from "../../assets/timer_bold.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
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
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)
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
        <TimerSettings timerState={state.timerState} />
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
          <motion.div
            layout
            key="timer_settings"
            className="mt-2 flex justify-center"
            animate={{
              opacity: state.timerState !== "running" ? 1 : 0,
              height: state.timerState !== "running" ? "auto" : 0,
            }}
          >
            <motion.button
              className="flex items-center rounded-xl px-3 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              whileHover={{ scale: 1.06 }}
              onClick={() => setSettingsModalOpen(true)}
            >
              <SettingsIcon className="mr-1 h-4 w-4" />
              Settings
            </motion.button>
          </motion.div>
          {state.timerState === "idle" ? (
            <motion.button
              layout
              type="submit"
              onClick={() => dispatch({ type: "start" })}
              className="m-auto mt-4 flex h-8 w-24 rounded-full bg-rose-400"
              whileHover={{ scale: 1.06 }}
              variants={buttonVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <div className="m-auto font-semibold tracking-wide text-gray-800">
                Start
              </div>
            </motion.button>
          ) : state.timerState === "running" ? (
            <motion.button
              layout
              type="submit"
              onClick={() => dispatch({ type: "pause" })}
              className="m-auto mt-4 flex h-8 w-24 rounded-full bg-rose-400"
              whileHover={{ scale: 1.06 }}
              variants={buttonVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <div className="m-auto font-semibold tracking-wide text-gray-800">
                Pause
              </div>
            </motion.button>
          ) : (
            <div className="flex justify-center space-x-3">
              <motion.button
                layout
                type="submit"
                onClick={() => dispatch({ type: "start" })}
                className="mt-4 flex h-8 w-24 rounded-full bg-rose-400"
                whileHover={{ scale: 1.06 }}
                variants={buttonVariants}
                initial="initial"
                animate="default"
                exit="close"
              >
                <div className="m-auto font-semibold tracking-wide">
                  Continue
                </div>
              </motion.button>
              <motion.button
                layout
                type="submit"
                onClick={() =>
                  dispatch({ type: "reset", newTime: initialTime })
                }
                className="mt-4 flex h-8 w-24 rounded-full bg-rose-400"
                whileHover={{ scale: 1.06 }}
                variants={buttonVariants}
                initial="initial"
                animate="default"
                exit="close"
              >
                <div className="m-auto font-semibold tracking-wide text-gray-800">
                  Stop
                </div>
              </motion.button>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {settingsModalOpen && (
            <TimerSettingsModal
              key="timer_settings_modal"
              closeModal={() => setSettingsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

type FocusType = "ALL" | "TASKS" | "GOALS" | "DREAMS"

const focusTypeOptions = [
  { label: "All", value: "ALL" as FocusType },
  { label: "Tasks", value: "TASKS" as FocusType },
  { label: "Goals", value: "GOALS" as FocusType },
  { label: "Dreams", value: "DREAMS" as FocusType },
]

function TimerSettings({ timerState }: { timerState: TimerState }) {
  const [focusOn, setFocusOn] = useState<OptionType | null>()
  const [focusType, setFocusType] = useState<FocusType | null>(
    focusTypeOptions[0].value
  )

  const getFocusOptions = (inputValue: string) =>
    new Promise<OptionType[]>(resolve => {
      setTimeout(() => {
        resolve([{ label: "Test", value: 123 }])
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

export default Timer
