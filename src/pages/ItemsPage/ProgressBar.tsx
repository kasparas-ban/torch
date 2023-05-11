import { motion } from "framer-motion"

function ItemProgress({ progress }: { progress: number }) {
  return (
    <motion.div
      className={`absolute top-0 left-0 h-full bg-red-400`}
      style={{ width: `${Math.trunc(progress * 100)}%` }}
    ></motion.div>
  )
}

export default ItemProgress
