import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import useTimerStore from "../components/Timer/useTimer"

const pageTitles = {
  "/items": "Torch | Goals",
  "/calendar": "Torch | Calendar",
  "/world": "Torch | World",
  "/stats": "Torch | Stats",
  "/": "Torch | Timer",
} as { [key: string]: string }

function TimerTitleWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const time = useTimerStore.use.time()
  const timerState = useTimerStore.use.timerState()

  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60

  const title =
    timerState === "idle"
      ? pageTitles[location.pathname]
      : `${minutes}:${seconds < 10 ? "0" + seconds : seconds} - Focus`

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  )
}

export default TimerTitleWrapper
