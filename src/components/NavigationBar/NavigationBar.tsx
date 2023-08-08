import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { useMediaQuery } from "react-responsive"
import { AnimatePresence, motion } from "framer-motion"
import { NavigationBarWrapper, useScrollPosition } from "./helpers"
import { ReactComponent as CalendarIcon } from "../../assets/navigation_icons/calendar.svg"
import { ReactComponent as TasksIcon } from "../../assets/navigation_icons/goals.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
import { ReactComponent as WorldIcon } from "../../assets/navigation_icons/world.svg"
import { ReactComponent as StatsIcon } from "../../assets/navigation_icons/stats.svg"
import { ReactComponent as TorchLogo } from "../../assets/torch_logo.svg"
import { ReactComponent as UserIcon } from "../../assets/user.svg"

function NavigationBar() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  return (
    <>
      {isDesktop ? (
        <NavbarContentDesktop />
      ) : (
        <>{createPortal(<NavbarMobile />, document.body)}</>
      )}
    </>
  )
}

function NavbarMobile() {
  return (
    <div
      className={clsx(
        "fixed bottom-0 w-full z-20 py-2 bg-transparent flex justify-center max-[768px]:px-3 shadow-lg",
        "before:from-50% before:absolute before:top-[-20px] before:z-[-1] before:h-[calc(100%+20px)] before:w-full before:bg-gradient-to-t before:from-white/80 before:content-['']",
      )}
    >
      <div className="w-full max-w-[650px]">
        <NavigationBarWrapper mobile>
          <NavbarContentMobile />
        </NavigationBarWrapper>
      </div>
    </div>
  )
}

function NavbarContentMobile() {
  return (
    <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] w-full justify-between px-3">
      <NavigationLink path="items" Icon={TasksIcon} linkName={"Tasks"} mobile />
      <NavigationLink path="stats" Icon={StatsIcon} linkName={"Stats"} mobile />
      <NavigationLink
        path=""
        Icon={TimerIcon}
        linkName="Timer"
        highlight
        mobile
      />
      <NavigationLink path="world" Icon={WorldIcon} linkName={"World"} mobile />
      <NavigationLink
        path="account"
        Icon={UserIcon}
        linkName={"Account"}
        mobile
      />
    </ul>
  )
}

function NavbarContentDesktop() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)

  return (
    <div
      className={clsx(
        "sticky top-0 z-20 pt-4 bg-transparent flex justify-center max-[768px]:px-6",
        "before:from-60% before:absolute before:top-0 before:z-[-1] before:h-[calc(100%+35px)] before:w-full before:bg-gradient-to-b before:from-white/90 before:content-['']",
      )}
    >
      <div className="w-full max-w-[650px]">
        <NavigationBarWrapper>
          <TorchLink />
          <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] px-4">
            <NavigationLink path="items" Icon={TasksIcon} linkName={"Tasks"} />
            <NavigationLink
              path="calendar"
              Icon={CalendarIcon}
              linkName="Calendar"
            />
            <NavigationLink
              path=""
              Icon={TimerIcon}
              linkName="Timer"
              highlight
            />
            <NavigationLink path="world" Icon={WorldIcon} linkName={"World"} />
            <NavigationLink path="stats" Icon={StatsIcon} linkName={"Stats"} />
          </ul>
          <div
            id="accountDropdownButton"
            className="group flex items-center max-[450px]:hidden"
          >
            <UserIcon
              id="userIcon"
              className="h-8 hover:cursor-pointer"
              onClick={() => setShowAccountDropdown(prev => !prev)}
            />
            {!showAccountDropdown && (
              <div className="relative hidden translate-y-5 group-hover:block">
                <div className="absolute -translate-x-11 rounded-lg bg-red-200 p-1 shadow-lg">
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
        </NavigationBarWrapper>
      </div>
    </div>
  )
}

interface NavigationLinkProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  path: string
  linkName: string
  highlight?: boolean
  mobile?: boolean
}

function NavigationLink({
  Icon,
  path,
  linkName,
  highlight,
  mobile,
}: NavigationLinkProps) {
  return (
    <Link
      to={path}
      className={clsx(
        "flex flex-col items-center justify-center",
        highlight ? "mx-4 w-12 rounded-full" : "rounded-lg",
      )}
    >
      {highlight ? (
        <TimerLink Icon={Icon} mobile={mobile} />
      ) : (
        <div
          className={clsx(
            "peer rounded-lg py-2 px-3 hover:cursor-pointer",
            !mobile && "max-[450px]:hidden hover:bg-slate-300",
          )}
        >
          <Icon className="mx-auto h-6 w-6 text-slate-800" />
        </div>
      )}
      {!mobile && (
        <div className="relative z-10 hidden translate-y-5 peer-hover:block">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-200 p-1 shadow-lg">
            {linkName}
          </div>
        </div>
      )}
    </Link>
  )
}

const TorchLink = () => {
  const { yScroll } = useScrollPosition()

  return (
    <motion.div
      className="relative -top-1 h-12 hover:cursor-pointer"
      animate={{ scale: yScroll ? 0.8 : 1 }}
    >
      <TorchLogo className="h-12 w-6" />
    </motion.div>
  )
}

const TimerLink = ({
  Icon,
  mobile,
}: {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  mobile?: boolean
}) => {
  const { yScroll } = useScrollPosition()

  return (
    <motion.div
      className="bg-multi-color bg-multi-color-delay peer mx-2 rounded-full py-2 px-2 brightness-150 hover:cursor-pointer hover:brightness-100"
      animate={{ scale: !mobile && yScroll ? 0.8 : 1 }}
    >
      <Icon className="mx-auto h-8 w-8 text-slate-800" />
    </motion.div>
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
      className="z-10 w-44 divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
    >
      <div className="rounded-t-lg px-4 py-3 text-sm text-gray-900 hover:cursor-pointer hover:bg-gray-100 dark:text-white">
        <div>Bonnie Green</div>
        <div className="truncate font-medium">name@email.com</div>
        <div className="mx-2 mt-2 truncate rounded-lg bg-gray-300 py-1 text-center text-xs font-medium text-gray-700">
          Free account
        </div>
      </div>
      <ul
        className="text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="accountDropdownButton"
      >
        <li>
          <a
            href="#"
            className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar
