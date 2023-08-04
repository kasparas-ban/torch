import { useRef, useState } from "react"
import { motion } from "framer-motion"

function TimerSettings() {
  const [timerDuration, setTimerDuration] = useState({
    timer: 25,
    break: 5,
    longBreak: 15,
  })

  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-3 px-0 pb-2 sm:px-4">
        <div className="mt-4 inline-flex w-full items-center justify-center">
          <hr className="my-2 h-0.5 w-full rounded border-0 bg-gray-200 dark:bg-gray-700"></hr>
          <div className="absolute left-1/2 -translate-x-1/2 bg-white px-4 dark:bg-gray-900">
            <div className="font-semibold">Duration (min)</div>
          </div>
        </div>
        <div className="flex gap-2">
          <NumberInput
            id="timer_duration"
            label="Timer"
            inputName="timer_duration"
            placeholder="0"
            value={timerDuration.timer}
            setValue={(input: string) =>
              setTimerDuration(prev => ({ ...prev, timer: Number(input) }))
            }
          />
          <NumberInput
            id="timer_break_duration"
            label="Break"
            inputName="timer_break_duration"
            placeholder="0"
            value={timerDuration.break}
            setValue={(input: string) =>
              setTimerDuration(prev => ({ ...prev, break: Number(input) }))
            }
          />
          <NumberInput
            id="timer_long_break_duration"
            label="Long break"
            inputName="timer_long_break_duration"
            placeholder="0"
            value={timerDuration.longBreak}
            setValue={(input: string) =>
              setTimerDuration(prev => ({
                ...prev,
                longBreak: Number(input),
              }))
            }
          />
        </div>
      </div>
      <div className="flex justify-center">
        <motion.button
          className="mt-4 text-lg font-semibold"
          whileHover={{ scale: 1.06 }}
        >
          Save
        </motion.button>
      </div>
    </div>
  )
}

function NumberInput({
  id,
  label,
  inputName,
  placeholder,
  value,
  setValue,
}: {
  id: string
  label: string
  inputName: string
  placeholder: string
  value?: string | number
  setValue: (input: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block w-full cursor-text text-center text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
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
        className="peer h-10 w-full rounded-2xl bg-gray-200 px-4 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder={placeholder ?? "0"}
        value={value ? Number(value) : ""}
        onChange={e => setValue(Number(e.target.value).toString())}
      />
    </div>
  )
}

export default TimerSettings
