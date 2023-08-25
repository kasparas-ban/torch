import { useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import { ReccuringPeriod, RecurringType } from "../../types"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"

const selectMenuMotion = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.1 },
  },
}

export default function RecurringInput({
  value,
  setValue,
}: {
  value?: RecurringType
  setValue: (input: RecurringType) => void
}) {
  return (
    <div className="flex">
      <input
        type="number"
        className="peer h-10 w-full flex-1 outline-none rounded-2xl bg-gray-200 px-4 text-center text-gray-900 focus:bg-white focus:ring-2 focus:ring-ring"
        min={1}
        max={99}
        value={value?.times ?? 1}
        onChange={e =>
          setValue({
            times: Number(e.target.value),
            period: value?.period || "DAY",
          })
        }
      />
      <div className="mx-3 flex items-center whitespace-nowrap">times per</div>
      <PeriodSelect
        value={value}
        setPeriod={period => setValue({ times: value?.times || 1, period })}
      />
    </div>
  )
}

const periodOptions = [
  { label: "Day", value: "DAY" },
  { label: "Week", value: "WEEK" },
  { label: "Month", value: "MONTH" },
] as const

function PeriodSelect({
  value,
  setPeriod,
}: {
  value?: RecurringType
  setPeriod: (period: ReccuringPeriod) => void
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownSelectRef = useRef<HTMLDivElement | null>(null)
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

  const selectedOption = periodOptions.find(
    option => option.value === value?.period,
  )

  const availableOptions = periodOptions.filter(
    option => option.value !== selectedOption?.value,
  )

  useLayoutEffect(() => {
    if (!dropdownMenuRef.current) return

    const onClick = (event: Event) => {
      const clickInside =
        dropdownMenuRef.current?.contains(event.target as Node) ||
        dropdownSelectRef.current?.contains(event.target as Node)

      if (isDropdownOpen && !clickInside) setIsDropdownOpen(false)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [dropdownMenuRef.current, isDropdownOpen])

  return (
    <>
      <motion.div
        key="period-select"
        className={clsx(
          "flex h-10 flex-1 cursor-pointer items-center gap-1 rounded-2xl bg-gray-200 pr-3 pl-5",
          isDropdownOpen ? "bg-white ring-2 ring-ring" : "",
        )}
        ref={dropdownSelectRef}
        onClick={toggleDropdown}
        whileHover={{ scale: isDropdownOpen ? 1 : 1.02 }}
      >
        {selectedOption?.label}
        <div className="mt-0.5 ml-auto scale-75 text-gray-400">
          <motion.div
            animate={{
              rotate: isDropdownOpen ? 180 : 0,
              transition: { duration: 0.2, type: "tween" },
            }}
          >
            <ArrowIcon />
          </motion.div>
        </div>
      </motion.div>
      <div className="relative" ref={dropdownMenuRef}>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className={clsx(
                "absolute top-10 right-1 z-20 mt-2 w-32 origin-top-right rounded-xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none",
                isDropdownOpen ? "bg-white outline-2 outline-blue-500/50" : "",
              )}
              role="menu"
              tabIndex={-1}
              variants={selectMenuMotion}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div role="none">
                {availableOptions.map((option, idx) => (
                  <button
                    className={clsx(
                      "block w-full border-b border-gray-200 px-4 py-2 text-center text-xl text-gray-700 hover:bg-gray-200",
                      idx === 0
                        ? "rounded-t-xl"
                        : idx === availableOptions.length - 1
                        ? "rounded-b-xl"
                        : "",
                    )}
                    role="menuitem"
                    tabIndex={-1}
                    key={`menu-item-${option.value}`}
                    onClick={e => {
                      e.preventDefault()
                      setPeriod(option.value)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
