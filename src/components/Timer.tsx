import { useState, useEffect, useReducer } from "react"

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
      <div className="m-auto mt-8 flex aspect-square max-w-xs flex-col justify-center rounded-full border border-rose-800 max-[320px]:mx-2">
        <div className="text-center text-8xl font-thin tabular-nums max-[300px]:text-7xl">
          {`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
        </div>
      </div>
      {state.timerState === "idle" ? (
        <button
          type="submit"
          onClick={() => dispatch({ type: "start" })}
          className="m-auto mt-8 flex h-8 w-24 rounded-full bg-rose-400"
        >
          <div className="m-auto">Start</div>
        </button>
      ) : state.timerState === "running" ? (
        <button
          type="submit"
          onClick={() => dispatch({ type: "pause" })}
          className="m-auto mt-8 flex h-8 w-24 rounded-full bg-rose-400"
        >
          <div className="m-auto">Pause</div>
        </button>
      ) : (
        <div className="flex justify-center space-x-3">
          <button
            type="submit"
            onClick={() => dispatch({ type: "start" })}
            className="mt-8 flex h-8 w-24 rounded-full bg-rose-400"
          >
            <div className="m-auto">Continue</div>
          </button>
          <button
            type="submit"
            onClick={() => dispatch({ type: "reset", newTime: initialTime })}
            className="mt-8 flex h-8 w-24 rounded-full bg-rose-400"
          >
            <div className="m-auto">Stop</div>
          </button>
        </div>
      )}
    </>
  )
}

export default Timer
