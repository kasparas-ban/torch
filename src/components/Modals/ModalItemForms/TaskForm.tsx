import { useState } from "react"
import clsx from "clsx"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import PriorityInput from "../../Inputs/PriorityInput"
import DurationInput from "../../Inputs/DurationInput"
import RecurringInput from "../../Inputs/RecurringInput"
import { Task } from "../../../types"
import useModal from "../useModal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { goalsData } from "@/data/data"
import { taskFormSchema } from "../schemas"
import { Input } from "@/components/ui/input"
import { Time } from "@internationalized/date"
import { groupItemsByParent } from "@/API/helpers"
import SelectField from "@/components/Inputs/SelectField"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"

type TaskForm = Omit<Task, "id" | "type" | "progress" | "goal"> & {
  goal?: { label: string; value: number }
}

type InputType = keyof z.infer<typeof taskFormSchema>

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

const getInitialTaskForm = (initialTask: Task): TaskForm => ({
  title: initialTask?.title || "",
  duration: initialTask?.duration || { hours: 0, minutes: 30 },
  priority: initialTask?.priority,
  targetDate: initialTask?.targetDate,
  recurring: initialTask?.recurring,
  goal: initialTask?.goal
    ? { label: initialTask.goal.title, value: initialTask.goal.id }
    : undefined,
})

function TaskForm() {
  const { editItem } = useModal()
  const defaultTask = getInitialTaskForm(editItem as Task)

  const defaultInputOrder = Object.keys(defaultTask).filter(
    key => !!defaultTask[key as InputType],
  ) as InputType[]
  const [inputOrder, setInputOrder] = useState(defaultInputOrder)

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultTask,
  })

  const onSubmit = (data: z.infer<typeof taskFormSchema>) => {
    console.log("onSubmit", data)
  }

  return (
    <div className="grow px-0 pb-2 sm:px-10">
      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <AnimatePresence initial={false} mode="popLayout">
              {/* Title */}
              <motion.div layout key="task_title" className="relative">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-3 tracking-wide">
                        Task title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Aa..."
                          className="bg-gray-200 placeholder:text-gray-400 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Duration */}
              <motion.div layout key="task_duration" className="relative">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-3 tracking-wide">
                        Duration
                      </FormLabel>
                      <FormControl>
                        <DurationInput
                          hourCycle={24}
                          aria-label="Duration"
                          value={
                            field.value?.hours || field.value?.minutes
                              ? new Time(
                                  field.value.hours || 0,
                                  field.value.minutes || 0,
                                )
                              : null
                          }
                          onChange={e =>
                            field.onChange({ hours: e.hour, minutes: e.minute })
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>

              {inputOrder.map(input => {
                if (input === "goal") {
                  const groupedGoals = groupItemsByParent(goalsData, "GOAL")
                  const goalOptions = Object.keys(groupedGoals).map(
                    dreamId => ({
                      label: groupedGoals[dreamId].parentLabel || "Other",
                      options: groupedGoals[dreamId].items.map(goal => ({
                        label: goal.title,
                        value: goal.id,
                      })),
                    }),
                  )

                  return (
                    <motion.div
                      layout
                      key="task_goal"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Goal
                              </FormLabel>
                              <FormControl>
                                <SelectField
                                  name="goal"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={goalOptions}
                                  isClearable
                                  menuPosition="fixed"
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
                }

                if (input === "priority")
                  return (
                    <motion.div
                      layout
                      key="task_priority"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Priority
                              </FormLabel>
                              <FormControl>
                                <PriorityInput
                                  id="task_priority"
                                  value={field.value || "MEDIUM"}
                                  setValue={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )

                if (input === "recurring")
                  return (
                    <motion.div
                      layout
                      key="task_recurring"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="recurring"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Recurring
                              </FormLabel>
                              <FormControl>
                                <RecurringInput
                                  value={
                                    field.value || { times: 1, period: "DAY" }
                                  }
                                  setValue={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
                return (
                  input === "targetDate" && (
                    <motion.div
                      layout
                      key="task_target_date"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="targetDate"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Target date
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className={clsx(
                                    "bg-gray-200 placeholder:text-red-200 focus:bg-white",
                                    field.value
                                      ? "text-gray-800"
                                      : "text-gray-400",
                                  )}
                                  type="date"
                                  min={new Date().toLocaleDateString("en-CA")}
                                  onFocus={e => e.target.showPicker()}
                                  onClick={e =>
                                    (e.target as HTMLInputElement).showPicker()
                                  }
                                  value={
                                    field.value
                                      ? new Date(
                                          field.value,
                                        )?.toLocaleDateString("en-CA")
                                      : ""
                                  }
                                  onChange={e => field.onChange(e.target.value)}
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
                )
              })}
            </AnimatePresence>
          </div>

          <AddTaskSections
            inputOrder={inputOrder}
            setInputOrder={setInputOrder}
          />

          <div className="relative mt-auto flex justify-center">
            <motion.button
              layout
              className="px-3 py-1 text-xl font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Save
            </motion.button>
          </div>
        </form>
      </Form>
    </div>
  )
}

function AddTaskSections({
  inputOrder,
  setInputOrder,
}: {
  inputOrder: InputType[]
  setInputOrder: React.Dispatch<React.SetStateAction<InputType[]>>
}) {
  const addInput = (input: InputType) => setInputOrder(prev => [...prev, input])
  const removeInput = (input: InputType) =>
    setInputOrder(prev => prev.filter(inp => inp !== input))

  const getInput = (input: InputType) => inputOrder.find(inp => inp === input)

  return (
    <motion.div layout className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("recurring") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
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
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("priority") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
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
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("targetDate") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
        onClick={e => {
          e.preventDefault()
          getInput("targetDate") === undefined
            ? addInput("targetDate")
            : removeInput("targetDate")
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {getInput("targetDate") ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className={clsx(
          "flex rounded-xl px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300",
          getInput("goal") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
        onClick={e => {
          e.preventDefault()
          getInput("goal") === undefined
            ? addInput("goal")
            : removeInput("goal")
        }}
      >
        Assign goal
        <div className="relative top-1 ml-0.5">
          {getInput("goal") === undefined ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </motion.div>
  )
}

export default TaskForm
