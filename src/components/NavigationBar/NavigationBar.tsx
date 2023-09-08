import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { useMediaQuery } from "react-responsive"
import { AnimatePresence, motion } from "framer-motion"
import { NavigationBarWrapper, useScrollPosition } from "./helpers"
import { ROUTES } from "@/routes"
import { useToast } from "../ui/use-toast"
import TimerToast from "../TimerToast/TimerToast"
import { ReactComponent as CalendarIcon } from "../../assets/navigation_icons/calendar.svg"
import { ReactComponent as TasksIcon } from "../../assets/navigation_icons/goals.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
import { ReactComponent as WorldIcon } from "../../assets/navigation_icons/world.svg"
import { ReactComponent as StatsIcon } from "../../assets/navigation_icons/stats.svg"
import { ReactComponent as TorchLogo } from "../../assets/torch_logo.svg"
import { ReactComponent as UserIcon } from "../../assets/user.svg"
import { SignOutButton, useUser } from "@clerk/clerk-react"

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
        "fixed bottom-0 z-20 flex w-full flex-col justify-center bg-transparent pb-4 pt-2 shadow-lg max-[768px]:px-3",
        "before:absolute before:top-[-30px] before:z-[-1] before:h-[calc(100%+30px)] before:w-full before:bg-gradient-to-t before:from-white/80 before:from-60% before:content-['']",
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
    <ul className="h-13 flex w-full justify-between space-x-1 overflow-visible rounded-[16px] px-3">
      <NavigationLink
        path={ROUTES.items.path}
        Icon={TasksIcon}
        linkName={ROUTES.items.label}
        mobile
      />
      <NavigationLink
        path={ROUTES.stats.path}
        Icon={StatsIcon}
        linkName={ROUTES.stats.label}
        mobile
      />
      <NavigationLink
        path={ROUTES.index.path}
        Icon={TimerIcon}
        linkName={ROUTES.index.label}
        highlight
        mobile
      />
      <NavigationLink
        path={ROUTES.world.path}
        Icon={WorldIcon}
        linkName={ROUTES.world.label}
        mobile
      />
      <NavigationLink
        path={ROUTES.account.path}
        Icon={UserIcon}
        linkName={ROUTES.account.label}
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
        "sticky top-0 z-20 flex flex-col justify-center bg-transparent pt-4 max-[768px]:px-6",
        "before:absolute before:top-0 before:z-[-1] before:h-[calc(100%+35px)] before:w-full before:bg-gradient-to-b before:from-white/90 before:from-60% before:content-['']",
      )}
    >
      <div className="z-30 mx-auto w-full max-w-[650px]">
        <NavigationBarWrapper>
          <TorchLink />
          <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] px-4">
            <NavigationLink
              path={ROUTES.items.path}
              Icon={TasksIcon}
              linkName={ROUTES.items.label}
            />
            <NavigationLink
              path={ROUTES.calendar.path}
              Icon={CalendarIcon}
              linkName={ROUTES.calendar.label}
            />
            <NavigationLink
              path={ROUTES.index.path}
              Icon={TimerIcon}
              linkName={ROUTES.index.label}
              highlight
            />
            <NavigationLink
              path={ROUTES.world.path}
              Icon={WorldIcon}
              linkName={ROUTES.world.label}
            />
            <NavigationLink
              path={ROUTES.stats.path}
              Icon={StatsIcon}
              linkName={ROUTES.stats.label}
            />
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
                <AccountDropdown
                  showAccountDropdown={showAccountDropdown}
                  setShowAccountDropdown={setShowAccountDropdown}
                />
              )}
            </AnimatePresence>
          </div>
        </NavigationBarWrapper>
      </div>
      <TimerToast />
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
            "peer flex flex-col rounded-lg px-3 py-2 pt-2 hover:cursor-pointer max-[600px]:pb-1",
            !mobile && "hover:bg-slate-300 max-[450px]:hidden",
          )}
        >
          <Icon className="mx-auto h-6 w-6 text-slate-800" />
          {mobile && <span className="text-[11px]">{linkName}</span>}
        </div>
      )}
      {!mobile && (
        <div className="relative z-30 hidden translate-y-5 peer-hover:block">
          <div className="absolute z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-200 p-1 shadow-lg">
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

  const scale = mobile ? 0.9 : yScroll ? 0.8 : 1

  return (
    <motion.div
      className="bg-multi-color bg-multi-color-delay peer mx-2 rounded-full px-2 py-2 brightness-150 transition-all hover:cursor-pointer hover:brightness-100"
      animate={{ scale }}
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
  const { isSignedIn, user } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const userIconElement = document.getElementById("userIcon")
      if (!userIconElement?.contains(e.target as Node))
        showAccountDropdown && setShowAccountDropdown(false)
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const showSignOutToast = async () => {
    toast({ description: "You signed-out successfully." })
  }

  return (
    <motion.div
      className="relative z-30 translate-y-5 group-hover:block"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 18 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: "tween" }}
    >
      <div
        className={clsx(
          "absolute -translate-y-0.5",
          isSignedIn ? "-translate-x-40" : "-translate-x-20",
        )}
      >
        <div
          id="dropdownInformation"
          ref={dropdownRef}
          className={clsx(
            "z-10 divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:divide-gray-600 dark:bg-gray-700",
            isSignedIn ? "w-44" : "w-24 text-center",
          )}
        >
          {isSignedIn ? (
            <>
              <Link to={ROUTES.account.path}>
                <div className="rounded-t-lg px-4 py-3 text-sm text-gray-900 hover:cursor-pointer hover:bg-gray-100 dark:text-white">
                  <div>Bonnie Green</div>
                  <div className="truncate font-medium">name@email.com</div>
                  <div className="mx-2 mt-2 truncate rounded-lg bg-gray-300 py-1 text-center text-xs font-medium text-gray-700">
                    Free account
                  </div>
                </div>
              </Link>
              <ul
                className="text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="accountDropdownButton"
              >
                <li>
                  <SignOutButton signOutCallback={showSignOutToast}>
                    <button className="block w-full px-4 py-4 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                      Sign out
                    </button>
                  </SignOutButton>
                </li>
              </ul>
            </>
          ) : (
            <ul
              className="text-gray-700 dark:text-gray-200"
              aria-labelledby="accountDropdownButton"
            >
              <li className="border-b border-gray-200">
                <Link
                  to={ROUTES.signIn.path}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.signUp.path}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default NavigationBar
