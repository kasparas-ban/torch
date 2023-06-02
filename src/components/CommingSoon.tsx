import { AnimatePresence, motion } from "framer-motion"

function CommingSoon() {
  return (
    <AnimatePresence>
      <motion.div
        className="mt-16 flex flex-col justify-center max-[768px]:px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween" }}
      >
        <div className="text-center text-6xl font-bold tracking-wide text-gray-700">
          COMING SOON
        </div>

        <div className="mt-6 text-center">
          Enter your email below and be the first to know when it goes live!
        </div>

        <div className="mx-auto mt-6 justify-center gap-2 min-[500px]:flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-11 w-72 rounded-lg bg-gray-200 px-4 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50 max-[500px]:block"
          ></input>
          <div className="text-center max-[500px]:mt-2">
            <motion.button
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800"
              whileHover={{ scale: 1.06 }}
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Notify Me!
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CommingSoon
