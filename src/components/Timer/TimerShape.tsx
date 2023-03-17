import { motion } from "framer-motion"
import "./timer.css"

export const TimerShape = ({
  initialTime,
  currentTime,
}: {
  initialTime: number
  currentTime: number
}) => {
  const fractionComplete = 1 - currentTime / initialTime

  const size = 318
  const { path } = getPathProps(size, 5, "counterclockwise")
  const strokeWidth = fractionComplete ? 5 : 0
  const stroke = "red"
  const strokeLinecap = "round"

  return (
    <div className="timer-shape absolute max-w-xs">
      <motion.svg
        style={{ width: "inherit", height: "inherit" }}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: fractionComplete }}
          transition={{
            duration: 1,
            ease: "linear",
          }}
          d={path}
          fill="none"
          stroke={stroke}
          strokeLinecap={strokeLinecap ?? "round"}
          strokeWidth={strokeWidth}
        />
      </motion.svg>
    </div>
  )
}

const getPathProps = (
  size: number,
  strokeWidth: number,
  rotation: "clockwise" | "counterclockwise"
) => {
  const halfSize = size / 2
  const halfStrokeWith = strokeWidth / 2
  const arcRadius = halfSize - halfStrokeWith
  const arcDiameter = 2 * arcRadius
  const rotationIndicator = rotation === "clockwise" ? "1,0" : "0,1"

  const pathLength = 2 * Math.PI * arcRadius
  const path = `m ${halfSize},${halfStrokeWith} a ${arcRadius},${arcRadius} 0 ${rotationIndicator} 0,${arcDiameter} a ${arcRadius},${arcRadius} 0 ${rotationIndicator} 0,-${arcDiameter}`

  return { path, pathLength }
}
