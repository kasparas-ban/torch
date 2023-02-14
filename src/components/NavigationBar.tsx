import { useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as GoalsIcon } from "../assets/navigation_icons/goals.svg"
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

  return (
    <nav className="mt-4 flex justify-between max-[768px]:px-6 md:justify-center md:space-x-36">
      <div className="relative -top-1 h-12 hover:cursor-pointer">
        <TorchLogo className="h-12 w-6" />
      </div>
      <ul className="flex h-12 space-x-1 overflow-visible rounded-[16px] px-4">
        <NavigationLink path={"goals"} Icon={GoalsIcon} linkName={"Goals"} />
        <NavigationLink
          path="calendar"
          Icon={CalendarIcon}
          linkName="Calendar"
        />
        <NavigationLink
          path="timer"
          Icon={TimerIcon}
          linkName="Timer"
          highlight
        />
        <NavigationLink path="world" Icon={WorldIcon} linkName={"World"} />
        <NavigationLink path="stats" Icon={StatsIcon} linkName={"Stats"} />
      </ul>
      <div className="group flex items-center hover:cursor-pointer max-[400px]:hidden">
        <UserIcon className="h-8" />
        <div className="relative hidden translate-y-5 group-hover:block">
          <div className="absolute -translate-x-11 -translate-y-0.5 rounded-lg bg-red-200 p-1">
            Account
          </div>
        </div>
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
        className={`fixed top-20 left-0 h-full w-full bg-white ${
          showModalMenu ? "visible" : "hidden"
        }`}
      >
        <ul className="divide-y divide-slate-200 px-4">
          <li className="py-1">
            <div className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200">
              <GoalsIcon className="h-6 w-6 text-slate-800" />
              <div className="ml-5 flex items-center">Goals</div>
            </div>
          </li>
          <li className="py-1">
            <div className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200">
              <CalendarIcon className="h-6 w-6 text-slate-800" />
              <div className="ml-5 flex items-center">Calendar</div>
            </div>
          </li>
          <li className="py-1">
            <div className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200">
              <WorldIcon className="h-6 w-6 text-slate-800" />
              <div className="ml-5 flex items-center">World</div>
            </div>
          </li>
          <li className="py-1">
            <div className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200">
              <StatsIcon className="h-6 w-6 text-slate-800" />
              <div className="ml-5 flex items-center">Statistics</div>
            </div>
          </li>
          <li className="py-1">
            <div className="flex select-none rounded-md p-2 hover:cursor-pointer hover:bg-red-200">
              <UserIcon className="h-6 w-6 text-slate-800" />
              <div className="ml-5 flex items-center">Account</div>
            </div>
          </li>
        </ul>
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
    <Link to={path} className="flex flex-col items-center justify-center">
      {highlight ? (
        <div className="peer mx-2 rounded-full bg-red-400 py-2 px-2 hover:cursor-pointer hover:bg-rose-500">
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

export default NavigationBar
