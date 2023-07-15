import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { ReactComponent as TasksIcon } from "../assets/navigation_icons/goals.svg"
import { ReactComponent as CalendarIcon } from "../assets/navigation_icons/calendar.svg"
import { ReactComponent as TimerIcon } from "../assets/navigation_icons/timer.svg"
import { ReactComponent as WorldIcon } from "../assets/navigation_icons/world.svg"
import { ReactComponent as StatsIcon } from "../assets/navigation_icons/stats.svg"
import { ReactComponent as MenuIcon } from "../assets/navigation_icons/menu.svg"
import { ReactComponent as TorchLogo } from "../assets/torch_logo.svg"
import { ReactComponent as UserIcon } from "../assets/user.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"

function NavigationBar() {
  const [showModalMenu, setShowModalMenu] = useState(false)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)

  return (
    <nav className="mt-4 flex justify-between max-[768px]:px-6 md:justify-center md:space-x-36">
      <div className="relative -top-1 h-12 hover:cursor-pointer">
        <TorchLogo className="h-12 w-6" />
      </div>
      <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] px-4">
        <NavigationLink path="items" Icon={TasksIcon} linkName={"Tasks"} />
        <NavigationLink
          path="calendar"
          Icon={CalendarIcon}
          linkName="Calendar"
        />
        <NavigationLink path="" Icon={TimerIcon} linkName="Timer" highlight />
        <NavigationLink path="world" Icon={WorldIcon} linkName={"World"} />
        <NavigationLink path="stats" Icon={StatsIcon} linkName={"Stats"} />
      </ul>
      <div
        id="accountDropdownButton"
        className="group flex items-center max-[400px]:hidden"
      >
        <UserIcon
          id="userIcon"
          className="h-8 hover:cursor-pointer"
          onClick={() => setShowAccountDropdown(prev => !prev)}
        />
        {!showAccountDropdown && (
          <div className="relative hidden translate-y-5 group-hover:block">
            <div className="absolute -translate-x-11 -translate-y-0.5 rounded-lg bg-red-200 p-1">
              Account
            </div>
          </div>
        )}
        <AnimatePresence>
          {showAccountDropdown && (
            <motion.div
              className="relative z-30 translate-y-5 group-hover:block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 18 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "tween" }}
            >
              <div className="absolute -translate-x-40 -translate-y-0.5">
                <AccountDropdown
                  showAccountDropdown={showAccountDropdown}
                  setShowAccountDropdown={setShowAccountDropdown}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="group hidden items-center hover:cursor-pointer max-[400px]:flex">
        {showModalMenu ? (
          <CloseIcon
            onClick={() => setShowModalMenu(prev => !prev)}
            className="h-8 w-6"
          />
        ) : (
          <MenuIcon
            onClick={() => setShowModalMenu(prev => !prev)}
            className="h-8 w-6"
          />
        )}
      </div>
      <div
        className={`fixed top-20 left-0 z-30 h-full w-full bg-white ${
          showModalMenu ? "visible" : "hidden"
        }`}
      >
        <ul className="divide-y divide-slate-200 px-4">
          <li className="py-1">
            <Link to="items" onClick={() => setShowModalMenu(false)}>
              <motion.div
                className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200"
                whileTap={{ scale: 0.98 }}
              >
                <TasksIcon className="h-6 w-6 text-slate-800" />
                <div className="ml-5 flex items-center">Goals</div>
              </motion.div>
            </Link>
          </li>
          <li className="py-1">
            <Link to="calendar" onClick={() => setShowModalMenu(false)}>
              <motion.div
                className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200"
                whileTap={{ scale: 0.98 }}
              >
                <CalendarIcon className="h-6 w-6 text-slate-800" />
                <div className="ml-5 flex items-center">Calendar</div>
              </motion.div>
            </Link>
          </li>
          <li className="py-1">
            <Link to="world" onClick={() => setShowModalMenu(false)}>
              <motion.div
                className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200"
                whileTap={{ scale: 0.98 }}
              >
                <WorldIcon className="h-6 w-6 text-slate-800" />
                <div className="ml-5 flex items-center">World</div>
              </motion.div>
            </Link>
          </li>
          <li className="py-1">
            <Link to="stats" onClick={() => setShowModalMenu(false)}>
              <motion.div
                className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200"
                whileTap={{ scale: 0.98 }}
              >
                <StatsIcon className="h-6 w-6 text-slate-800" />
                <div className="ml-5 flex items-center">Statistics</div>
              </motion.div>
            </Link>
          </li>
          <li className="py-1">
            <Link to="account" onClick={() => setShowModalMenu(false)}>
              <motion.div
                className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200"
                whileTap={{ scale: 0.98 }}
              >
                <UserIcon className="h-6 w-6 text-slate-800" />
                <div className="ml-5 flex items-center">Account</div>
              </motion.div>
            </Link>
          </li>
        </ul>
        <motion.div
          className="fixed bottom-8 w-full text-center"
          whileTap={{ scale: 0.96 }}
        >
          <div className="mx-auto w-fit px-8 py-2 text-lg">Sign Out</div>
        </motion.div>
      </div>
    </nav>
  )
}

interface NavigationLinkProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  path: string
  linkName: string
  highlight?: boolean
}

function NavigationLink({
  Icon,
  path,
  linkName,
  highlight,
}: NavigationLinkProps) {
  return (
    <Link
      to={path}
      className={clsx(
        "flex flex-col items-center justify-center",
        highlight ? "rounded-full" : "rounded-lg"
      )}
    >
      {highlight ? (
        <div className="bg-multi-color bg-multi-color-delay peer mx-2 rounded-full py-2 px-2 brightness-150 hover:cursor-pointer hover:brightness-100">
          <Icon className="mx-auto h-8 w-8 text-slate-800" />
        </div>
      ) : (
        <div className="peer rounded-lg py-2 px-3 hover:cursor-pointer hover:bg-slate-300 max-[400px]:hidden">
          <Icon className="mx-auto h-6 w-6 text-slate-800" />
        </div>
      )}
      <div className="relative hidden translate-y-5 min-[400px]:peer-hover:block">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-200 p-1">
          {linkName}
        </div>
      </div>
    </Link>
  )
}

function AccountDropdown({
  showAccountDropdown,
  setShowAccountDropdown,
}: {
  showAccountDropdown: boolean
  setShowAccountDropdown: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const userIconElement = document.getElementById("userIcon")
      if (!userIconElement?.contains(e.target as Node))
        showAccountDropdown && setShowAccountDropdown(false)
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div
      id="dropdownInformation"
      ref={dropdownRef}
      className="z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <div className="rounded-t-lg px-4 py-3 text-sm text-gray-900 hover:cursor-pointer hover:bg-gray-100 dark:text-white">
        <div>Bonnie Green</div>
        <div className="truncate font-medium">name@email.com</div>
        <div className="mx-2 mt-2 truncate rounded-lg bg-gray-300 py-1 text-center text-xs font-medium text-gray-700">
          Free account
        </div>
      </div>
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="accountDropdownButton"
      >
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar
