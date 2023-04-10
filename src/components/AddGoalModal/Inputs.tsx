import { useRef, useState } from "react"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"
import { ReactComponent as ArrowsIcon } from "../../assets/arrows.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"

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
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
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
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
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
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
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
        htmlFor="goal_deadline"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Deadline
      </label>
      <input
        id={id}
        name={`${id}_name`}
        ref={inputRef}
        type="date"
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
  inputName,
  label,
}: {
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputName}
        name={inputName}
        ref={inputRef}
        type="text"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="Aa..."
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
  inputName,
  label,
  icon,
  placeholder,
}: {
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
          htmlFor={inputName}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputName}
        name={inputName}
        ref={inputRef}
        type="number"
        className={`peer h-10 w-full rounded-2xl bg-gray-200 ${
          icon ? "pl-10" : "pl-4"
        } pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50`}
        placeholder={placeholder ?? "Aa..."}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      {icon && (
        <div
          className="absolute left-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:text-gray-700"
          onClick={() => inputRef?.current?.focus()}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

export function TimeInput({
  inputName,
  label,
}: {
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputName}
        name={inputName}
        ref={inputRef}
        type="number"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="1"
        min={0}
        max={99}
        value={inputValue}
        onChange={e => {
          console.log(
            e.target.value,
            Number(e.target.value),
            Number(e.target.value.length) < 3
          )
          Number(e.target.value.length) < 3 && setInputValue(e.target.value)
        }}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      <div
        className={`absolute left-8 bottom-2 cursor-text px-4 pl-2 transition-all ${
          inputValue ? "text-gray-600" : "text-gray-400"
        } peer-focus:text-gray-600`}
        onClick={() => inputRef?.current?.focus()}
      >
        hours
      </div>
    </div>
  )
}

export function DurationInput() {
  return (
    <div className="w-full">
      <label
        htmlFor="duration_input"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Duration
      </label>
      <div className="flex gap-2">
        <TimeInput inputName="time" />
        <div className="my-auto text-gray-400">
          <ArrowsIcon />
        </div>
        <NumberInput inputName="time" icon={<TimerIcon />} placeholder="2" />
      </div>
    </div>
  )
}
