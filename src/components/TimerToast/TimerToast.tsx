import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import useTimerStore from "../Timer/useTimer"
import { secondsToMinutes } from "../../helpers"
import { ReactComponent as PlayIcon } from "../../assets/timer_icons/play.svg"
import { ReactComponent as PauseIcon } from "../../assets/timer_icons/pause.svg"
import { ReactComponent as ResetIcon } from "../../assets/timer_icons/reset.svg"
import useTimerForm from "../Timer/useTimerForm"

const buttonVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

const TimerToast = () => {
  const time = useTimerStore.use.time()
  const startTimer = useTimerStore.use.startTimer()
  const pauseTimer = useTimerStore.use.pauseTimer()
  const resetTimer = useTimerStore.use.resetTimer()
  const timerState = useTimerStore.use.timerState()

  const { focusOn } = useTimerForm()

  const showPlayBtn = timerState === "idle" || timerState === "paused"
  const showPauseBtn = timerState === "running"
  const showResetBtn = timerState === "paused"

  const location = useLocation()
  const isShowing =
    location.pathname !== "/" &&
    (timerState === "running" || timerState === "paused")

  return (
    <AnimatePresence mode="popLayout">
      {isShowing && (
        <motion.div
          className="sticky z-20 top-[70px] mt-4 flex justify-center max-[768px]:px-6 md:space-x-36 max-[600px]:top-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: [1, 0.2, 0], y: [0, -10, -20] }}
        >
          <motion.div
            layout
            className={clsx(
              "flex w-fit items-center gap-4 rounded-3xl bg-gradient-to-b from-red-400 to-rose-500 px-4 py-1 drop-shadow max-sm:max-w-full",
              timerState !== "running" && "from-red-200 to-rose-300",
            )}
            initial={{ background: "" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {focusOn && (
              <motion.div
                layout="position"
                className={clsx(
                  "max-w-sm truncate pl-2 pr-1 text-lg",
                  timerState !== "running" ? "text-gray-600" : "text-white",
                )}
              >
                {focusOn.label}
              </motion.div>
            )}

            <motion.div
              layout
              className={clsx(
                "min-w-[90px] pl-2 pr-1 pb-[3px] text-3xl font-semibold",
                timerState !== "running" ? "text-gray-600" : "text-white",
              )}
            >
              {secondsToMinutes(time)}
            </motion.div>
            <motion.div
              layout
              className={clsx(
                "h-4/5 w-[1px]",
                timerState !== "running" ? "bg-gray-500/30" : "bg-gray-100",
              )}
            />
            <div className="flex gap-2">
              <AnimatePresence mode="popLayout">
                {showPlayBtn && (
                  <motion.button
                    layout
                    key="play_btn"
                    onClick={startTimer}
                    className={clsx(
                      "group flex h-10 w-10 items-center justify-center rounded-full text-gray-100 hover:bg-rose-200 hover:text-gray-600",
                    )}
                    whileHover={{ scale: 1.06 }}
                    variants={buttonVariants}
                    initial="initial"
                    animate="default"
                    exit="close"
                  >
                    <PlayIcon className="h-5 w-5 stroke-2 pl-px text-gray-600 group-hover:text-gray-700" />
                  </motion.button>
                )}

                {showPauseBtn && (
                  <motion.button
                    layout
                    key="pause_btn"
                    onClick={pauseTimer}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-gray-100 hover:bg-rose-200 hover:text-gray-700"
                    whileHover={{ scale: 1.06 }}
                    variants={buttonVariants}
                    initial="initial"
                    animate="default"
                    exit="close"
                  >
                    <PauseIcon className="h-5 w-5 stroke-2" />
                  </motion.button>
                )}

                {showResetBtn && (
                  <motion.button
                    layout
                    key="reset_btn"
                    onClick={resetTimer}
                    className="group flex h-10 w-10 items-center justify-center rounded-full text-gray-100 hover:bg-rose-200 hover:text-gray-700"
                    whileHover={{ scale: 1.06 }}
                    variants={buttonVariants}
                    initial="initial"
                    animate="default"
                    exit="close"
                  >
                    <ResetIcon className="h-5 w-5 stroke-2 text-gray-600 group-hover:text-gray-700" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TimerToast
