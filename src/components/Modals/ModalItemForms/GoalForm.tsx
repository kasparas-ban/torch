import { useLayoutEffect, useRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { z } from "zod"
import useModal from "../useModal"
import { Subtasks } from "./Subtasks"
import { Goal } from "../../../types"
import PriorityInput from "../../Inputs/PriorityInput"
import { goalFormSchema } from "../schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SelectField from "@/components/Inputs/SelectField"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"

type GoalForm = Omit<
  Goal,
  "id" | "type" | "progress" | "dream" | "timeSpent" | "totalTimeSpent"
> & {
  dream?: { label: string; value: number }
}

type InputType = keyof z.infer<typeof goalFormSchema>

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

const getInitialGoalForm = (initialGoal: Goal): GoalForm => ({
  title: initialGoal?.title || "",
  priority: initialGoal?.priority,
  targetDate: initialGoal?.targetDate,
  tasks: initialGoal?.tasks || [],
  dream: initialGoal?.dream
    ? { label: initialGoal.dream.title, value: initialGoal.dream.id }
    : undefined,
})

function GoalForm() {
  const { editItem, addTaskOnOpen, modalKey } = useModal()
  const defaultGoal = getInitialGoalForm(editItem as Goal)

  const defaultInputOrder = (Object.keys(defaultGoal) as InputType[]).filter(
    key => !!defaultGoal[key],
  )
  const [inputOrder, setInputOrder] = useState(defaultInputOrder)

  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: defaultGoal,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  })

  const onSubmit = (data: z.infer<typeof goalFormSchema>) => {
    console.log("onSubmit", data)
  }

  const modalRef = useRef<HTMLElement | null>(null)
  const initialized = useRef(false)

  useLayoutEffect(() => {
    modalRef.current = document.getElementById(modalKey)
    if (!initialized.current && addTaskOnOpen && modalRef.current) {
      initialized.current = true

      setTimeout(() => {
        const addTaskButton = document.getElementById("add_subtask_button")
        addTaskButton?.click()
      }, 100)
    }
  }, [])

  const addSubtask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const defaultTask = { title: "", duration: undefined }
    append(defaultTask)

    if (modalRef.current)
      setTimeout(
        () =>
          modalRef.current?.scrollBy({
            top: 1000,
            behavior: "smooth",
          }),
        100,
      )
  }

  const removeSubtask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) => {
    e.preventDefault()
    remove(index)
  }

  return (
    <div className="grow px-0 pb-2 pt-4 sm:px-10">
      <Form {...form}>
        <form
          className="flex h-full flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div layout className="relative">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-3 tracking-wide">
                        Goal title
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

              {inputOrder.map(input => {
                if (input === "dream") {
                  // const dreamOptions = ([] as Dream).map(dream => ({
                  //   label: dream.title,
                  //   value: dream.id,
                  // }))

                  return (
                    <motion.div
                      layout
                      key="goal_dream"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <FormField
                        control={form.control}
                        name="dream"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="pl-3 tracking-wide">
                                Dream
                              </FormLabel>
                              <FormControl>
                                <SelectField
                                  name="dream"
                                  value={field.value}
                                  onChange={field.onChange}
                                  // options={dreamOptions}
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
                      key="goal_priority"
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
                                  id="goal_priority"
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
                if (input === "targetDate")
                  return (
                    <motion.div
                      layout
                      key="goal_target_date"
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
                                  onChange={e =>
                                    field.onChange(new Date(e.target.value))
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )
                        }}
                      />
                    </motion.div>
                  )
              })}
            </AnimatePresence>
          </div>

          <AddGoalSections
            inputOrder={inputOrder}
            setInputOrder={setInputOrder}
          />

          <Subtasks
            form={form}
            subtasks={fields}
            removeSubtask={removeSubtask}
          />

          <div className="relative mb-5 mt-2 flex justify-center">
            <motion.button
              layout
              className="flex px-3 py-1 text-[15px] text-gray-500"
              onClick={addSubtask}
              whileTap={{ scale: 0.95 }}
              id="add_subtask_button"
            >
              <div className="relative bottom-px">
                <PlusSmallIcon />
              </div>
              Add Subtask
            </motion.button>
          </div>

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

function AddGoalSections({
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
          getInput("dream") ? "bg-[#d0d0d0]" : "bg-gray-200",
        )}
        onClick={e => {
          e.preventDefault()
          getInput("dream") ? removeInput("dream") : addInput("dream")
        }}
      >
        Assign Dream
        <div className="relative top-1 ml-0.5">
          {getInput("dream") ? (
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
    </motion.div>
  )
}

export default GoalForm
