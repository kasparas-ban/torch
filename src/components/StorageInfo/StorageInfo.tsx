import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useUser } from "@clerk/clerk-react"
import clsx from "clsx"
import { ROUTES } from "@/routes"
import useStorage from "@/pages/ItemsPage/useStorageStore"
import { ReactComponent as ArrowIcon } from "../../assets/arrow-right.svg"

function StorageInfo() {
  const { isStorageUsed } = useStorage()
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  const handleClick = () => !isSignedIn && navigate(ROUTES.account.path)

  return (
    <AnimatePresence mode="popLayout">
      {isStorageUsed && (
        <motion.div
          className={clsx(
            "flex",
            !isSignedIn ? "w-full cursor-pointer" : "cursor-default",
          )}
          whileTap={{ scale: !isSignedIn ? 0.99 : 1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClick}
        >
          <div className={clsx(!isSignedIn && "ml-auto w-full")}>
            <div className="flex w-full justify-between rounded-lg bg-gradient-to-tl from-red-300 to-rose-300 px-3 py-1 text-xs uppercase">
              <span className="text-white">Using local storage</span>
              {!isSignedIn && (
                <span className="flex font-bold text-white">
                  Sign-In to save online
                  <ArrowIcon className="relative top-px ml-1 w-3 stroke-[3]" />
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StorageInfo
