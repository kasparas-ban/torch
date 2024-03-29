import { Fragment } from "react"
import { motion } from "framer-motion"
import { useTimerHistory } from "@/API/timerHistoryAPI"
import { formatPercentages, formatTimeSpent } from "@/helpers"

function TimerHistory() {
  const { data } = useTimerHistory()

  return (
    data && (
      <motion.div
        layout
        className="mb-4 mt-8 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className="mx-auto">
          <div className="mb-3 ml-3 text-2xl font-bold text-gray-800">
            Timer history
          </div>
          <div className="mx-4 grid grid-cols-[210px_100px_100px_110px_100px] text-gray-500 max-[700px]:grid-cols-[240px_100px_100px] max-[500px]:grid-cols-[auto_auto_auto] max-[500px]:gap-x-3">
            <div className="mb-2 font-semibold text-gray-600">Focus on</div>
            <div className="mb-2 font-semibold text-gray-600 max-[700px]:hidden">
              Start time
            </div>
            <div className="mb-2 font-semibold text-gray-600 max-[700px]:hidden">
              Finish time
            </div>
            <div className="mb-2 font-semibold text-gray-600">Progress</div>
            <div className="mb-2 font-semibold text-gray-600">Time spent</div>
            {data.map((row, idx) => (
              <Fragment key={idx}>
                <div className="mb-1 mr-3 truncate max-[700px]:mr-2 max-[500px]:mr-0">
                  {row.focusOn?.label}
                </div>
                <div className="mb-1 max-[700px]:hidden">{row.startTime}</div>
                <div className="mb-1 max-[700px]:hidden">{row.finishTime}</div>
                <div className="mb-1">
                  {formatPercentages(row.progress)}%{` + `}
                  <span className="font-bold">
                    {formatPercentages(row.progressDifference)}%
                  </span>
                </div>
                <div className="mb-1 pl-2">
                  {formatTimeSpent(row.timeSpent)}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    )
  )
}

export default TimerHistory
