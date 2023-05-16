import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  DateInput,
  DurationInput,
  PriorityInput,
  PriorityType,
  TextInput,
} from "../Inputs"
import { Task } from "../../../types"
import { ReactComponent as BackIcon } from "../../../assets/back.svg"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"
import "../inputStyles.css"

interface IAddTaskModal {
  showModal: boolean
  handleBack: () => void
  initialTask?: Task
}

interface ITask {
  title: string
  duration: { hours: number | null; minutes: number | null }
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  recurring?: boolean
  goal?: any | null
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

function AddTaskModal({ showModal, handleBack, initialTask }: IAddTaskModal) {
  const inputOrder = initialTask
    ? Object.keys(initialTask).filter(
        key =>
          initialTask?.[key as keyof Task] !== undefined &&
          key !== "taskId" &&
          key !== "progress"
      )
    : []

  const defaultTask = {
    title: initialTask?.title || "",
    duration: initialTask?.duration || { hours: 0, minutes: 30 },
    priority: initialTask?.priority,
    targetDate: initialTask?.targetDate,
    recurring: initialTask?.recurring,
    goal: initialTask?.goal,
    inputOrder: inputOrder,
  }

  const [task, setTask] = useState<ITask>(defaultTask)

  useEffect(() => {
    setTask(defaultTask)
  }, [initialTask])

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            layout
            key="add_task_modal"
            className="absolute inset-0 z-20 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded-lg sm:border"
            variants={modalVariants}
            initial="initial"
            animate="default"
            exit="close"
          >
            <motion.button
              layout
              onClick={handleBack}
              whileTap={{ scale: 0.95 }}
            >
              <BackIcon />
            </motion.button>
            <motion.div layout className="text-center text-5xl font-semibold">
              {initialTask ? "Edit Task" : "New Task"}
            </motion.div>
            <div className="mx-auto">
              <TaskForm task={task} setTask={setTask} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function TaskForm({
  task,
  setTask,
}: {
  task: ITask
  setTask: React.Dispatch<React.SetStateAction<ITask>>
}) {
  return (
    <div className="px-0 pb-2 sm:px-10">
      <form className="mt-6">
        <div className="flex flex-col gap-1">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div layout className="relative">
              <TextInput
                id="task_title"
                value={task.title}
                setValue={(input: string) =>
                  setTask(prev => ({ ...prev, title: input }))
                }
                inputName="task_title"
                label="Task title"
              />
            </motion.div>

            <motion.div layout key={`task_duration`} className="relative">
              <DurationInput
                id={`task_duration`}
                duration={task.duration}
                setDuration={(hours: string, minutes: string) =>
                  setTask(prev => ({
                    ...prev,
                    duration: {
                      hours: Number(hours),
                      minutes: Number(minutes),
                    },
                  }))
                }
              />
            </motion.div>

            {task.inputOrder.map(input => {
              if (input === "goal")
                return (
                  task.goal !== undefined && (
                    <motion.div
                      layout
                      key="task_goal"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <TextInput
                        id="task_goal"
                        value={task.goal}
                        setValue={(input: string) =>
                          setTask(prev => ({ ...prev, goal: input }))
                        }
                        inputName="task_goal"
                        label="Goal"
                      />
                    </motion.div>
                  )
                )
              if (input === "priority")
                return (
                  task.priority && (
                    <motion.div
                      layout
                      key="task_priority"
                      className="relative"
                      variants={formVariants}
                      initial="addInitial"
                      animate="default"
                      exit="remove"
                    >
                      <PriorityInput
                        id="task_priority"
                        value={task.priority}
                        setValue={(input: PriorityType) =>
                          setTask(prev => ({ ...prev, priority: input }))
                        }
                      />
                    </motion.div>
                  )
                )
              return (
                input === "targetDate" &&
                task.targetDate !== undefined && (
                  <motion.div
                    layout
                    key="task_target_date"
                    className="relative"
                    variants={formVariants}
                    initial="addInitial"
                    animate="default"
                    exit="remove"
                  >
                    <DateInput
                      id="task_target_date"
                      value={task.targetDate}
                      setValue={(input: string) =>
                        setTask(prev => ({
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

        <AddTaskSections task={task} setTask={setTask} />

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

function AddTaskSections({
  task,
  setTask,
}: {
  task: ITask
  setTask: React.Dispatch<React.SetStateAction<ITask>>
}) {
  const addTargetDate = () =>
    setTask(prev => ({
      ...prev,
      targetDate: null,
      inputOrder: [...prev.inputOrder, "targetDate"],
    }))
  const removeTargetDate = () =>
    setTask(prev => ({
      ...prev,
      targetDate: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "targetDate"),
    }))

  const addPriority = () =>
    setTask(prev => ({
      ...prev,
      priority: "MEDIUM",
      inputOrder: [...prev.inputOrder, "priority"],
    }))
  const removePriority = () =>
    setTask(prev => ({
      ...prev,
      priority: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "priority"),
    }))

  const addGoal = () =>
    setTask(prev => ({
      ...prev,
      goal: null,
      inputOrder: [...prev.inputOrder, "goal"],
    }))
  const removeGoal = () =>
    setTask(prev => ({
      ...prev,
      goal: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "goal"),
    }))

  const addRecurring = () =>
    setTask(prev => ({
      ...prev,
      recurring: true,
    }))
  const removeRecurring = () =>
    setTask(prev => ({
      ...prev,
      recurring: undefined,
    }))

  return (
    <motion.div layout className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className={`flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600 ${
          task.recurring ? "bg-blue-300" : ""
        }`}
        onClick={e => {
          e.preventDefault()
          task.recurring ? removeRecurring() : addRecurring()
        }}
      >
        Recurring
        <div className="relative top-1 ml-0.5">
          {task.recurring ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300"
        onClick={e => {
          e.preventDefault()
          task.priority ? removePriority() : addPriority()
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {!task.priority ? (
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
          task.targetDate === undefined ? addTargetDate() : removeTargetDate()
        }}
      >
        Target date
        <div className="relative top-1 ml-0.5">
          {task.targetDate === undefined ? (
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
          task.goal === undefined ? addGoal() : removeGoal()
        }}
      >
        Assign Goal
        <div className="relative top-1 ml-0.5">
          {task.goal === undefined ? (
            <PlusSmallIcon className="h-4 w-4" />
          ) : (
            <MinusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </motion.div>
  )
}

export default AddTaskModal
