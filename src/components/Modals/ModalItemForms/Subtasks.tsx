import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FieldArrayWithId, UseFormReturn } from "react-hook-form"
import clsx from "clsx"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { getTime } from "@/helpers"
import { Input } from "@/components/ui/input"
import PriorityInput from "../../Inputs/PriorityInput"
import DurationInput from "../../Inputs/DurationInput"
import RecurringInput from "../../Inputs/RecurringInput"
import { GoalFormType, SubitemKeyType, SubitemType } from "../schemas"
import { ReactComponent as CloseIcon } from "../../../assets/close.svg"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

type SubtaskArrayType = FieldArrayWithId<GoalFormType, "tasks", "id">[]

export function Subtasks({
  subtasks,
  removeSubtask,
  form,
}: {
  subtasks: SubtaskArrayType
  removeSubtask: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) => void
  form: UseFormReturn<GoalFormType>
}) {
  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {subtasks?.length && (
          <motion.div
            layout
            key="subtasks_title"
            variants={formVariants}
            initial="addInitial"
            animate="default"
            exit="remove"
            className="mb-1 px-4 text-sm text-gray-600"
          >
            Subtasks
          </motion.div>
        )}
      </AnimatePresence>

      <div key="subtasks_list" className="flex flex-col gap-4">
        <AnimatePresence initial={false} mode="popLayout">
          {subtasks?.map((task, idx) => (
            <div className="relative" key={task.id}>
              <SubtaskItem
                index={idx}
                subtask={task}
                removeSubtask={removeSubtask}
                form={form}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

function SubtaskItem({
  index,
  subtask,
  removeSubtask,
  form,
}: {
  index: number
  subtask: SubitemType
  removeSubtask: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) => void
  form: UseFormReturn<GoalFormType>
}) {
  const defaultInputOrder = (Object.keys(subtask) as SubitemKeyType[]).filter(
    key => !!subtask[key],
  )
  const [inputOrder, setInputOrder] = useState(defaultInputOrder)

  return (
    <motion.div
      layout
      className="relative rounded-2xl bg-gray-300 p-2 drop-shadow-xl"
      variants={formVariants}
      initial="addInitial"
      animate="default"
      exit="remove"
    >
      <motion.button
        layout
        className="absolute right-[-5px] top-[-10px] z-10 h-8 w-8 rounded-full bg-gray-400 drop-shadow-md hover:bg-gray-500"
        onClick={e => removeSubtask(e, index)}
        whileTap={{ scale: 0.95 }}
      >
        <CloseIcon className="m-auto h-full w-6 text-gray-200" />
      </motion.button>
      <div className="flex flex-col gap-1">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            layout
            key={`subtask_title_${subtask.id}`}
            className="relative"
          >
            <FormItem>
              <FormLabel className="pl-3 tracking-wide">Task title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Aa..."
                  className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                  {...form.register(`tasks.${index}.title`)}
                />
              </FormControl>
              <FormMessage className="pl-3" />
            </FormItem>
          </motion.div>

          <motion.div
            layout
            key={`subtask_duration_${subtask.id}`}
            className="relative"
          >
            <FormField
              control={form.control}
              key={`subtask_duration_${subtask.id}`}
              name={`tasks.${index}.duration`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-3 tracking-wide">Duration</FormLabel>
                  <FormControl>
                    <DurationInput
                      hourCycle={24}
                      aria-label="Duration"
                      value={getTime(field.value)}
                      onChange={e =>
                        field.onChange(e.hour * 60 * 60 + e.minute * 60)
                      }
                    />
                  </FormControl>
                  <FormMessage className="pl-3" />
                </FormItem>
              )}
            />
          </motion.div>

          {inputOrder.map(input => {
            if (input === "priority") {
              return (
                <motion.div
                  layout
                  key={`subtask_priority_${subtask.id}}`}
                  className="relative"
                  variants={formVariants}
                  initial="addInitial"
                  animate="default"
                  exit="remove"
                >
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">
                      Priority
                    </FormLabel>
                    <FormControl>
                      <PriorityInput
                        value={
                          form.watch(`tasks.${index}.priority`) || "MEDIUM"
                        }
                        onChange={value =>
                          form.setValue(`tasks.${index}.priority`, value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                </motion.div>
              )
            }
            if (input === "targetDate") {
              const targetDate = form.watch(`tasks.${index}.targetDate`)

              return (
                <motion.div
                  layout
                  key={`subtask_target_date_${subtask.id}}`}
                  className="relative"
                  variants={formVariants}
                  initial="addInitial"
                  animate="default"
                  exit="remove"
                >
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">
                      Target date
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={clsx(
                          "bg-gray-200 placeholder:text-red-200 focus:bg-white",
                          targetDate ? "text-gray-800" : "text-gray-400",
                        )}
                        type="date"
                        min={new Date().toLocaleDateString("en-CA")}
                        onFocus={e => e.target.showPicker()}
                        onClick={e =>
                          (e.target as HTMLInputElement).showPicker()
                        }
                        value={
                          targetDate
                            ? new Date(targetDate)?.toLocaleDateString("en-CA")
                            : ""
                        }
                        // onChange={e =>
                        //   form.setValue(
                        //     `tasks.${index}.targetDate`,
                        //     new Date(e.target.value),
                        //   )
                        // }
                      />
                    </FormControl>
                  </FormItem>
                </motion.div>
              )
            }
            if (input === "recurring") {
              return (
                <motion.div
                  layout
                  key={`subtask_recurring_${subtask.id}}`}
                  className="relative"
                  variants={formVariants}
                  initial="addInitial"
                  animate="default"
                  exit="remove"
                >
                  <FormItem>
                    <FormLabel className="pl-3 tracking-wide">
                      Recurring
                    </FormLabel>
                    <FormControl>
                      <RecurringInput
                        value={
                          form.watch(`tasks.${index}.recurring`) || {
                            times: 1,
                            period: "DAY",
                          }
                        }
                        setValue={value =>
                          form.setValue(`tasks.${index}.recurring`, value)
                        }
                      />
                    </FormControl>
                  </FormItem>
                </motion.div>
              )
            }
          })}

          <motion.div layout className="mb-1">
            <AddTaskSections
              inputOrder={inputOrder}
              setInputOrder={setInputOrder}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function AddTaskSections({
  inputOrder,
  setInputOrder,
}: {
  inputOrder: SubitemKeyType[]
  setInputOrder: React.Dispatch<React.SetStateAction<SubitemKeyType[]>>
}) {
  const addInput = (input: SubitemKeyType) =>
    setInputOrder(prev => [...prev, input])
  const removeInput = (input: SubitemKeyType) =>
    setInputOrder(prev => prev.filter(inp => inp !== input))

  const getInput = (input: SubitemKeyType) =>
    inputOrder.find(inp => inp === input)

  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600"
        onClick={e => {
          e.preventDefault()
          getInput("recurring")
            ? removeInput("recurring")
            : addInput("recurring")
        }}
      >
        Recurring
        <div className="relative top-1 ml-0.5">
          {getInput("recurring") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600"
        onClick={e => {
          e.preventDefault()
          getInput("targetDate")
            ? removeInput("targetDate")
            : addInput("targetDate")
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {getInput("targetDate") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600"
        onClick={e => {
          e.preventDefault()
          getInput("priority") ? removeInput("priority") : addInput("priority")
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {getInput("priority") ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </div>
  )
}
