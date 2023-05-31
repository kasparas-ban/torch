import { motion } from "framer-motion"
import { ReactComponent as BackIcon } from "../../assets/back.svg"
import { useEffect, useRef, useState } from "react"

interface ITimerSettingsModal {
  closeModal: () => void
}

const modalVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

function AddGeneralModal({ closeModal }: ITimerSettingsModal) {
  const backgroundRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (e: MouseEvent) => {
    backgroundRef.current?.contains(e.target as Node) && closeModal()
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const [timerDuration, setTimerDuration] = useState({
    timer: 25,
    break: 5,
    longBreak: 15,
  })

  return (
    <>
      <motion.div
        ref={backgroundRef}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.9,
          transition: { duration: 0.2 },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        className="absolute inset-0 z-10 bg-gray-200"
      />
      <motion.div
        layout
        variants={modalVariants}
        initial="initial"
        animate="default"
        exit="close"
        key="timer_settings_modal"
        className="absolute inset-0 z-20 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] min-[500px]:h-fit min-[500px]:max-h-[80vh] min-[500px]:max-w-md min-[500px]:rounded-lg min-[500px]:border"
      >
        <motion.button layout onClick={closeModal} whileTap={{ scale: 0.95 }}>
          <BackIcon />
        </motion.button>
        <motion.div layout className="mb-8 text-center text-5xl font-semibold">
          Timer Settings
        </motion.div>
        <div className="mx-auto">
          <div className="flex flex-col gap-3 px-0 pb-2 sm:px-4">
            <div className="inline-flex w-full items-center justify-center">
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
      </motion.div>
    </>
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
        className={`peer h-10 w-full rounded-2xl bg-gray-200 px-4 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50`}
        placeholder={placeholder ?? "0"}
        value={value ? Number(value) : ""}
        onChange={e => setValue(Number(e.target.value).toString())}
      />
    </div>
  )
}

export default AddGeneralModal
