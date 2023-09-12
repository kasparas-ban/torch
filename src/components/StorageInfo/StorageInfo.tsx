import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ROUTES } from "@/routes"
import useStorage from "@/pages/ItemsPage/useStorageStore"
import { ReactComponent as ArrowIcon } from "../../assets/arrow-right.svg"

function StorageInfo() {
  const { isStorageUsed } = useStorage()

  return (
    <AnimatePresence mode="popLayout">
      {isStorageUsed && (
        <Link to={ROUTES.account.path} className="w-full">
          <motion.div
            className="flex"
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="ml-auto w-full">
              <div className="flex w-full justify-between rounded-lg bg-gradient-to-tl from-red-300 to-rose-300 px-3 py-1 text-xs uppercase">
                <span className="text-white">Using local storage</span>
                <span className="flex font-bold text-white">
                  Sign-In to save online
                  <ArrowIcon className="relative top-px ml-1 w-3 stroke-[3]" />
                </span>
              </div>
            </div>
          </motion.div>
        </Link>
      )}
    </AnimatePresence>
  )
}

export default StorageInfo
