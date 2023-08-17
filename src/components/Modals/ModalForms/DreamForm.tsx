import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"
import PriorityInput, { PriorityType } from "../../Inputs/PriorityInput"
import TextInput from "../../Inputs/TextInput"
import DateInput from "../../Inputs/DateInput"
import "../inputStyles.css"

interface IDream {
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  inputOrder: string[]
}

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

function DreamForm() {
  const defaultDream = {
    title: "",
    inputOrder: [],
  }
  const [dream, setDream] = useState<IDream>(defaultDream)

  return (
    <div className="px-0 pb-2 sm:px-10">
      <form>
        <div className="flex flex-col gap-1">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div layout className="relative">
              <TextInput
                id="dream_title"
                value={dream.title}
                setValue={(input: string) =>
                  setDream(prev => ({ ...prev, title: input }))
                }
                inputName="dream_title"
                label="Dream title"
              />
            </motion.div>

            {dream.inputOrder.map(input => {
              if (input === "priority")
                return (
                  dream.priority && (
                    <motion.div
                      layout
                      key="dream_priority"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <PriorityInput
                        id="dream_priority"
                        value={dream.priority}
                        setValue={(input: PriorityType) =>
                          setDream(prev => ({ ...prev, priority: input }))
                        }
                      />
                    </motion.div>
                  )
                )
              return (
                dream.targetDate !== undefined && (
                  <motion.div
                    layout
                    key="dream_target_date"
                    className="relative"
                    variants={formVariants}
                    initial="addInitial"
                    animate="default"
                    exit="remove"
                  >
                    <DateInput
                      id="dream_target_date"
                      value={dream.targetDate}
                      setValue={(input: string) =>
                        setDream(prev => ({
                          ...prev,
                          targetDate: new Date(input),
                        }))
                      }
                    />
                  </motion.div>
                )
              )
            })}
          </AnimatePresence>
        </div>

        <AddDreamSections dream={dream} setDream={setDream} />

        <div className="relative flex justify-center">
          <motion.button
            layout
            className="px-3 py-1 text-xl font-medium"
            whileTap={{ scale: 0.95 }}
          >
            Save
          </motion.button>
        </div>
      </form>
    </div>
  )
}

function AddDreamSections({
  dream,
  setDream,
}: {
  dream: IDream
  setDream: React.Dispatch<React.SetStateAction<IDream>>
}) {
  const addTargetDate = () =>
    setDream(prev => ({
      ...prev,
      targetDate: null,
      inputOrder: [...prev.inputOrder, "targetDate"],
    }))
  const removeTargetDate = () =>
    setDream(prev => ({
      ...prev,
      targetDate: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "targetDate"),
    }))

  const addPriority = () =>
    setDream(prev => ({
      ...prev,
      priority: "MEDIUM",
      inputOrder: [...prev.inputOrder, "priority"],
    }))
  const removePriority = () =>
    setDream(prev => ({
      ...prev,
      priority: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "priority"),
    }))

  return (
    <motion.div layout className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300"
        onClick={e => {
          e.preventDefault()
          dream.priority ? removePriority() : addPriority()
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {!dream.priority ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300"
        onClick={e => {
          e.preventDefault()
          dream.targetDate === undefined ? addTargetDate() : removeTargetDate()
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {dream.targetDate === undefined ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </motion.div>
  )
}

export default DreamForm
