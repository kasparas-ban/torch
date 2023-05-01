import { useRef } from "react"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"
import { ReactComponent as MinusIcon } from "../../assets/minus.svg"

export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export function PriorityInput({
  id,
  value,
  setValue,
}: {
  id: string
  value?: PriorityType
  setValue: (input: PriorityType) => void
}) {
  return (
    <>
      <label
        htmlFor="priority"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Priority
      </label>
      <ul className="grid w-full gap-2 min-[400px]:grid-cols-3">
        <li onClick={() => setValue("LOW")}>
          <input
            type="radio"
            id={`${id}_low`}
            value="LOW"
            className="peer hidden"
            checked={value === "LOW"}
            readOnly
          />
          <label
            htmlFor={`${id}_low`}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            Low
          </label>
        </li>
        <li onClick={() => setValue("MEDIUM")}>
          <input
            type="radio"
            id={`${id}_medium`}
            value="MEDIUM"
            checked={value === "MEDIUM"}
            className="peer hidden"
            readOnly
          />
          <label
            htmlFor={`${id}_medium`}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            Medium
          </label>
        </li>
        <li onClick={() => setValue("HIGH")}>
          <input
            type="radio"
            id={`${id}_high`}
            value="HIGH"
            checked={value === "HIGH"}
            className="peer hidden"
            readOnly
          />
          <label
            htmlFor={`${id}_high`}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            High
          </label>
        </li>
      </ul>
    </>
  )
}

export function DateInput({
  id,
  value,
  setValue,
}: {
  id: string
  value?: Date | null
  setValue: (input: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <label
        htmlFor="target_date_input"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Target date
      </label>
      <input
        id={id}
        name={`${id}_name`}
        ref={inputRef}
        type="date"
        min={new Date().toLocaleDateString("en-CA")}
        className={`${
          value ? "text-gray-900" : "empty-date"
        } peer h-10 w-full cursor-text rounded-2xl bg-gray-200 px-4  focus:bg-white focus:outline-2 focus:outline-blue-500/50 `}
        onFocus={e => e.target.showPicker()}
        onClick={e => (e.target as HTMLInputElement).showPicker()}
        onChange={e => setValue(e.target.value)}
        value={value === null ? "" : value?.toLocaleDateString("en-CA")}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
    </>
  )
}

export function TextInput({
  id,
  value,
  setValue,
  inputName,
  label,
}: {
  id: string
  value?: string
  setValue: (input: string) => void
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={inputName}
        ref={inputRef}
        type="text"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="Aa..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
    </div>
  )
}

export function NumberInput({
  id,
  value,
  setValue,
  inputName,
  label,
  icon,
  placeholder,
}: {
  id: string
  value?: string | number
  setValue: (input: string) => void
  inputName: string
  label?: string
  icon?: JSX.Element
  placeholder?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={inputName}
        ref={inputRef}
        type="number"
        min={0}
        max={99}
        className={`peer h-10 w-full rounded-2xl bg-gray-200 ${
          icon ? "pl-10" : "pl-4"
        } pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50`}
        placeholder={placeholder ?? "Aa..."}
        value={value ? Number(value) * 2 : ""}
        onChange={e => setValue((Number(e.target.value) / 2).toString())}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      {icon && (
        <div
          className={`absolute left-0 bottom-2 cursor-text px-4 pl-2 ${
            value ? "text-gray-700" : "text-gray-400"
          } transition-all peer-focus:text-gray-700`}
          onClick={() => inputRef?.current?.focus()}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

export function HoursInput({
  id,
  value,
  setValue,
  inputName,
  label,
}: {
  id: string
  value?: string | number
  setValue: (input: string) => void
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={inputName}
        ref={inputRef}
        type="number"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="1"
        min={0}
        max={99}
        value={value ? value : ""}
        onChange={e =>
          Number(e.target.value.length) < 3 && setValue(e.target.value)
        }
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      <div
        className={`absolute left-11 bottom-2 cursor-text px-4 pl-2 transition-all ${
          value ? "text-gray-600" : "text-gray-400"
        } peer-focus:text-gray-600`}
        onClick={() => inputRef?.current?.focus()}
      >
        hours
      </div>
    </div>
  )
}

export function DurationInput({
  id,
  duration,
  setDuration,
}: {
  id: string
  duration?: { hours?: number | null; minutes?: number | null }
  setDuration: (hours: string, minutes: string) => void
}) {
  return (
    <div className="w-full">
      <label
        htmlFor="duration_input"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Duration
      </label>
      <TimerInput duration={duration} setDuration={setDuration} />
    </div>
  )
}

function TimerInput({
  duration,
  setDuration,
}: {
  duration?: { hours?: number | null; minutes?: number | null }
  setDuration: (hours: string, minutes: string) => void
}) {
  return (
    <div className="w-42">
      <div className="relative mt-1 flex w-full flex-row gap-3 bg-transparent max-[400px]:flex-wrap max-[400px]:gap-2">
        <div className="flex h-8 flex-grow flex-row max-[400px]:basis-full">
          <button
            data-action="decrement"
            className="h-full cursor-pointer rounded-l-xl bg-gray-400 px-1 text-gray-600 outline-none drop-shadow-lg hover:bg-gray-500 hover:text-gray-700"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours && duration.hours > 0
                  ? (Number(duration.hours) - 1).toString()
                  : "0",
                duration?.minutes?.toString() ?? ""
              )
            }}
          >
            <span className="m-auto flex justify-center text-2xl font-thin">
              <MinusIcon />
            </span>
          </button>
          <input
            type="number"
            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-200 text-center font-semibold  text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none"
            name="timer"
            min={0}
            max={99}
            value={duration?.hours ?? 0}
            onChange={e =>
              setDuration(e.target.value, duration?.minutes?.toString() ?? "")
            }
          ></input>
          <button
            data-action="increment"
            className="h-full cursor-pointer rounded-r-xl bg-gray-400 px-1 text-gray-600 drop-shadow-lg hover:bg-gray-500 hover:text-gray-700"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours ? (Number(duration.hours) + 1).toString() : "1",
                duration?.minutes?.toString() ?? ""
              )
            }}
          >
            <span className="m-auto flex justify-center text-2xl font-thin">
              <PlusIcon />
            </span>
          </button>
          <span className="my-auto ml-2.5 h-full text-lg font-medium text-gray-500 max-[400px]:basis-4/12">
            h
          </span>
        </div>
        <div className="flex h-8 flex-grow flex-row">
          <button
            data-action="decrement"
            className="h-full cursor-pointer rounded-l-xl bg-gray-400 px-1 text-gray-600 outline-none drop-shadow-lg hover:bg-gray-500 hover:text-gray-700"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours?.toString() ?? "",
                duration?.minutes && duration.minutes > 0
                  ? (Number(duration.minutes) - 1).toString()
                  : "0"
              )
            }}
          >
            <span className="m-auto flex justify-center text-2xl font-thin">
              <MinusIcon />
            </span>
          </button>
          <input
            type="number"
            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-200 text-center font-semibold  text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none"
            name="timer"
            min={0}
            max={99}
            value={duration?.minutes ?? 0}
            onChange={e =>
              setDuration(duration?.hours?.toString() ?? "", e.target.value)
            }
          ></input>
          <button
            data-action="increment"
            className="h-full cursor-pointer rounded-r-xl bg-gray-400 px-1 text-gray-600 drop-shadow-lg hover:bg-gray-500 hover:text-gray-700"
            onClick={e => {
              e.preventDefault()
              setDuration(
                duration?.hours?.toString() ?? "",
                duration?.minutes
                  ? (Number(duration.minutes) + 1).toString()
                  : "1"
              )
            }}
          >
            <span className="m-auto flex justify-center text-2xl font-thin">
              <PlusIcon />
            </span>
          </button>
          <span className="my-auto ml-2.5 h-full text-lg font-medium text-gray-500 max-[400px]:basis-4/12">
            min
          </span>
        </div>
      </div>
    </div>
  )
}

// function Dropdown() {
//   const dropdownButtonRef = useRef<HTMLDivElement>(null)
//   const dropdownPanelRef = useRef<HTMLDivElement>(null)
//   const [value, setValue] = useState("min")
//   const [showDropdown, setShowDropDown] = useState(false)

//   useEffect(() => {
//     const onClick = (event: Event) => {
//       const clickInside = [dropdownButtonRef, dropdownPanelRef].some(
//         reference_ => reference_.current?.contains(event.target as Node)
//       )
//       if (showDropdown && !clickInside) {
//         return setShowDropDown(false)
//       }
//     }
//     if (!showDropdown) {
//       return document.removeEventListener("click", onClick)
//     }
//     document.addEventListener("click", onClick)
//     return () => document.removeEventListener("click", onClick)
//   }, [dropdownButtonRef, dropdownPanelRef, showDropdown])

//   return (
//     <div className="ml-3 h-full">
//       <div ref={dropdownButtonRef} className="h-full w-20">
//         <button
//           type="button"
//           onClick={() => setShowDropDown(prev => !prev)}
//           className="inline-flex h-full w-full items-center justify-center gap-x-1.5 rounded-xl bg-white px-3 py-2 text-lg font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//           id="menu-button"
//         >
//           <div className="flex">
//             <span className="w-10">{value}</span>
//             <span className="flex items-center">
//               <svg
//                 className="relative top-[2px] -mr-1 h-5 w-5 text-gray-400"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </span>
//           </div>
//         </button>
//       </div>
//       {showDropdown && (
//         <div
//           className="absolute right-0 z-50 mt-2 w-20 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//           role="menu"
//           tabIndex={-1}
//           ref={dropdownPanelRef}
//         >
//           <div className="" role="none">
//             <button
//               className="block w-full rounded-t-xl px-4 py-2 text-center text-lg font-bold text-gray-700 hover:bg-gray-200"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-0"
//               onClick={() => {
//                 setValue("min")
//                 setShowDropDown(false)
//               }}
//             >
//               min
//             </button>
//             <button
//               className="block w-full rounded-b-xl px-4 py-2 text-center text-lg font-bold text-gray-700 hover:bg-gray-200"
//               role="menuitem"
//               tabIndex={-1}
//               id="menu-item-1"
//               onClick={() => {
//                 setValue("h")
//                 setShowDropDown(false)
//               }}
//             >
//               h
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
