import clsx from "clsx"
import { motion } from "framer-motion"
import useEditItem from "../useEditItem"

function ItemProgress({
  progress,
  showEditPanel,
}: {
  progress: number
  showEditPanel: boolean
}) {
  const { editItem } = useEditItem()

  return (
    <motion.div
      className={clsx(
        "absolute top-0 left-0 h-full",
        editItem
          ? showEditPanel
            ? "bg-red-400"
            : "bg-gray-400"
          : "bg-red-400",
      )}
      style={{ width: `${Math.trunc(progress * 100)}%` }}
    ></motion.div>
  )
}

export default ItemProgress
