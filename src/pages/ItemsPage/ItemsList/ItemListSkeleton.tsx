import { motion } from "framer-motion"
import { ReactComponent as DotsIcon } from "../../../assets/dots.svg"

function ItemListSkeleton() {
  return (
    <motion.ul
      key="list_skeleton"
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {Array.from({ length: 3 }).map((_, idx) => (
        <motion.div
          key={`item_${idx}`}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.6, delay: 0.1 * idx }}
        >
          <ItemStrip />
        </motion.div>
      ))}
    </motion.ul>
  )
}

function ItemStrip() {
  return (
    <motion.div className="relative flex w-full min-w-0">
      <motion.div className="relative border bg-gray-200 flex w-full items-center overflow-hidden rounded-2xl pl-6 pr-1 md:rounded-3xl">
        <motion.div className="z-10 py-3">
          <div className="w-56 h-6 bg-gray-300 rounded-md" />
        </motion.div>
        <div className="rounded-full z-0 ml-auto h-10 w-10 flex shrink-0 items-center justify-center">
          <motion.div className="text-gray-400">
            <DotsIcon />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ItemListSkeleton
