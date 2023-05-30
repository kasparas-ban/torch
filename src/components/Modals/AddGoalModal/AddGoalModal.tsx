import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactComponent as BackIcon } from "../../../assets/back.svg"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"
import {
  DateInput,
  PriorityInput,
  PriorityType,
  SelectInput,
  TextInput,
} from "../Inputs"
import { Subtasks } from "./Subtasks"
import { Goal } from "../../../types"
import "../inputStyles.css"

interface IAddGoalModal {
  handleBack: () => void
  initialGoal?: Goal
  addTaskOnOpen?: boolean
}

export interface IGoal {
  goalId?: number
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  dream?: { label: string; value: number } | null
  subtasks?: ITask[]
  inputOrder: string[]
}

export interface ITask {
  id: number
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  duration?: { hours: number | null; minutes: number | null }
  targetDate?: Date | null
  recurring?: boolean
  inputOrder: string[]
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

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
}

function AddGoalModal({
  handleBack,
  initialGoal,
  addTaskOnOpen,
}: IAddGoalModal) {
  const inputOrder = initialGoal
    ? [
        ...(initialGoal.priority ? ["priority"] : []),
        ...(initialGoal.targetDate ? ["targetDate"] : []),
        ...(initialGoal.dream ? ["dream"] : []),
      ]
    : []

  const defaultGoal: IGoal = {
    title: initialGoal?.title || "",
    ...(initialGoal?.priority ? { priority: initialGoal?.priority } : {}),
    ...(initialGoal?.targetDate ? { targetDate: initialGoal?.targetDate } : {}),
    ...(initialGoal?.dream
      ? {
          dream: {
            label: initialGoal?.dream.title,
            value: initialGoal?.dream.dreamId,
          },
        }
      : {}),
    subtasks:
      initialGoal?.tasks?.map((task, idx) => ({
        id: idx,
        title: task.title,
        ...(task.priority ? { priority: task.priority } : {}),
        ...(task.duration ? { duration: task.duration } : {}),
        ...(task.targetDate ? { targetDate: task.targetDate } : {}),
        ...(task.recurring ? { recurring: task.recurring } : {}),
        inputOrder: [
          ...(task.priority ? ["priority"] : []),
          ...(task.duration ? ["duration"] : []),
          ...(task.targetDate ? ["targetDate"] : []),
        ],
      })) ?? [],
    inputOrder,
  }

  const [goal, setGoal] = useState<IGoal>(defaultGoal)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setGoal(defaultGoal)
  }, [initialGoal])

  useEffect(() => {
    if (addTaskOnOpen && modalRef.current) {
      const addTaskButton = document.getElementById("add_subtask_button")
      addTaskButton?.click()

      setTimeout(() => {
        const taskTitleInput = document.getElementById(
          `subtask_title_${goal.subtasks ? goal.subtasks.length + 1 : 0}`
        )
        taskTitleInput?.focus()
      }, 1000)
    }
  }, [addTaskOnOpen])

  return (
    <motion.div
      layout
      ref={modalRef}
      key="add_goal_modal"
      className="absolute inset-0 z-20 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded-lg sm:border"
      variants={modalVariants}
      initial="initial"
      animate="default"
      exit="close"
    >
      <motion.button layout onClick={handleBack} whileTap={{ scale: 0.95 }}>
        <BackIcon />
      </motion.button>
      <motion.div layout className="text-center text-5xl font-semibold">
        {initialGoal ? "Edit Goal" : "New Goal"}
      </motion.div>
      <div className="mx-auto">
        <GoalForm goal={goal} setGoal={setGoal} modalRef={modalRef} />
      </div>
    </motion.div>
  )
}

function GoalForm({
  goal,
  setGoal,
  modalRef,
}: {
  goal: IGoal
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
  modalRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const subtaskIdRef = useRef(goal.subtasks ? goal.subtasks.length : 0)

  const addSubtask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGoal(prev => ({
      ...prev,
      subtasks: [
        ...(prev.subtasks ? prev.subtasks : []),
        { id: ++subtaskIdRef.current, title: "", inputOrder: [] },
      ],
    }))

    if (modalRef.current)
      setTimeout(
        () =>
          modalRef.current?.scrollBy({
            top: 1000,
            behavior: "smooth",
          }),
        100
      )
  }

  return (
    <div className="px-0 pt-4 pb-2 sm:px-10">
      <form className="mt-6">
        <div className="flex flex-col gap-1">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div layout className="relative">
              <TextInput
                id="goal_title"
                value={goal.title}
                setValue={(input: string) =>
                  setGoal(prev => ({ ...prev, title: input }))
                }
                inputName="goal_title"
                label="Goal title"
              />
            </motion.div>

            {goal.inputOrder.map(input => {
              if (input === "dream")
                return (
                  goal.dream !== undefined && (
                    <motion.div
                      layout
                      key="goal_dream"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <SelectInput
                        id="goal_dream"
                        item={
                          goal.dream
                            ? {
                                label: goal.dream.label,
                                value: goal.dream.value,
                              }
                            : undefined
                        }
                        setValue={(
                          item: { label: string; value: number } | null
                        ) => setGoal(prev => ({ ...prev, dream: item }))}
                        label="Dream"
                      />
                    </motion.div>
                  )
                )
              if (input === "priority")
                return (
                  goal.priority && (
                    <motion.div
                      layout
                      key="goal_priority"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <PriorityInput
                        id="goal_priority"
                        value={goal.priority}
                        setValue={(input: PriorityType) =>
                          setGoal(prev => ({ ...prev, priority: input }))
                        }
                      />
                    </motion.div>
                  )
                )
              return (
                goal.targetDate !== undefined && (
                  <motion.div
                    layout
                    key="goal_target_date"
                    className="relative"
                    variants={formVariants}
                    initial="addInitial"
                    animate="default"
                    exit="remove"
                  >
                    <DateInput
                      id="goal_target_date"
                      value={goal.targetDate}
                      setValue={(input: string) =>
                        setGoal(prev => ({
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

        <AddGoalSections goal={goal} setGoal={setGoal} />

        {!!goal.subtasks?.length && <Subtasks goal={goal} setGoal={setGoal} />}

        <div className="relative mt-6 mb-5 flex justify-center">
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

        <div className="relative mb-2 flex justify-center">
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

function AddGoalSections({
  goal,
  setGoal,
}: {
  goal: IGoal
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
}) {
  const addTargetDate = () =>
    setGoal(prev => ({
      ...prev,
      targetDate: null,
      inputOrder: [...prev.inputOrder, "targetDate"],
    }))
  const removeTargetDate = () =>
    setGoal(prev => ({
      ...prev,
      targetDate: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "targetDate"),
    }))

  const addPriority = () =>
    setGoal(prev => ({
      ...prev,
      priority: "MEDIUM",
      inputOrder: [...prev.inputOrder, "priority"],
    }))
  const removePriority = () =>
    setGoal(prev => ({
      ...prev,
      priority: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "priority"),
    }))

  const addDream = () =>
    setGoal(prev => ({
      ...prev,
      dream: null,
      inputOrder: [...prev.inputOrder, "dream"],
    }))
  const removeDream = () =>
    setGoal(prev => ({
      ...prev,
      dream: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "dream"),
    }))

  return (
    <motion.div layout className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className={`flex rounded-xl ${
          goal.dream !== undefined ? "bg-[#d0d0d0]" : "bg-gray-200"
        } px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300`}
        onClick={e => {
          e.preventDefault()
          goal.dream === undefined ? addDream() : removeDream()
        }}
      >
        Assign Dream
        <div className="relative top-1 ml-0.5">
          {goal.dream === undefined ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className={`flex rounded-xl ${
          goal.targetDate !== undefined ? "bg-[#d0d0d0]" : "bg-gray-200"
        } px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300`}
        onClick={e => {
          e.preventDefault()
          goal.targetDate === undefined ? addTargetDate() : removeTargetDate()
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {goal.targetDate === undefined ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className={`flex rounded-xl ${
          goal.priority !== undefined ? "bg-[#d0d0d0]" : "bg-gray-200"
        } px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300`}
        onClick={e => {
          e.preventDefault()
          goal.priority ? removePriority() : addPriority()
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {!goal.priority ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </motion.div>
  )
}

export default AddGoalModal
