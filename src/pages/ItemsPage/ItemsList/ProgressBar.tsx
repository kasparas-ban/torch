import { motion } from "framer-motion"

function ItemProgress({
  progress,
  inEditMode,
}: {
  progress: number
  inEditMode: boolean
}) {
  return (
    <motion.div
      className={`absolute top-0 left-0 h-full ${
        inEditMode ? "bg-gray-400" : "bg-red-400"
      }`}
      style={{ width: `${Math.trunc(progress * 100)}%` }}
    ></motion.div>
  )
}

export default ItemProgress
