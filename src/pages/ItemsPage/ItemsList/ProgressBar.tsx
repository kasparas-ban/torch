import clsx from "clsx"
import { motion } from "framer-motion"
import useEditItem from "../useEditItem"

function ItemProgress({
  progress,
  showEditPanel,
  isRecurring,
}: {
  progress: number
  showEditPanel: boolean
  isRecurring?: boolean
}) {
  const { editItem } = useEditItem()

  const getProgressColor = () => {
    if (editItem) {
      if (showEditPanel) {
        return isRecurring ? "bg-blue-300" : "bg-red-400"
      }
      return "bg-gray-400"
    }

    return isRecurring ? "bg-blue-300" : "bg-red-400"
  }

  return (
    <motion.div
      className={clsx("absolute top-0 left-0 h-full", getProgressColor())}
      style={{ width: `${Math.trunc(progress * 100)}%` }}
    />
  )
}

export default ItemProgress
