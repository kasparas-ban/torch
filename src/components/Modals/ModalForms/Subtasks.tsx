import { AnimatePresence, motion } from "framer-motion"
import { IGoal, ITask } from "./GoalForm"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../../assets/minus_small.svg"
import { ReactComponent as CloseIcon } from "../../../assets/close.svg"
import PriorityInput, { PriorityType } from "../../Inputs/PriorityInput"
import DurationInput from "../../Inputs/DurationInput"
import TextInput from "../../Inputs/TextInput"
import DateInput from "../../Inputs/DateInput"

const formVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  addInitial: { opacity: 0, scale: 0.8 },
  remove: {
    opacity: [1, 0, 0],
    scale: [1, 0.8, 0.8],
    transition: { duration: 0.5 },
  },
}

export function AddTaskSections({
  id,
  task,
  setGoal,
}: {
  id: number
  task: ITask
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
}) {
  const addRecurring = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(task =>
        task.id === id
          ? {
              ...task,
              recurring: { times: 1, period: "DAY" },
            }
          : task
      ),
    }))
  const removeRecurring = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(task =>
        task.id === id
          ? {
              ...task,
              recurring: undefined,
            }
          : task
      ),
    }))

  const addTargetDate = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(task =>
        task.id === id
          ? {
              ...task,
              targetDate: null,
              inputOrder: [...task.inputOrder, "targetDate"],
            }
          : task
      ),
    }))
  const removeTargetDate = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(task =>
        task.id === id
          ? {
              ...task,
              targetDate: undefined,
              inputOrder: task.inputOrder.filter(
                input => input !== "targetDate"
              ),
            }
          : task
      ),
    }))

  const addPriority = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(task =>
        task.id === id
          ? {
              ...task,
              priority: "MEDIUM",
              inputOrder: [...task.inputOrder, "priority"],
            }
          : task
      ),
    }))
  const removePriority = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map(task =>
        task.id === id
          ? {
              ...task,
              priority: undefined,
              inputOrder: task.inputOrder.filter(input => input !== "priority"),
            }
          : task
      ),
    }))

  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
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
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600"
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
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600"
        onClick={e => {
          e.preventDefault()
          task.priority ? removePriority() : addPriority()
        }}
      >
        Priority
        <div className="relative top-1 ml-0.5">
          {task.priority ? (
            <MinusSmallIcon className="h-4 w-4" />
          ) : (
            <PlusSmallIcon className="h-4 w-4" />
          )}
        </div>
      </button>
    </div>
  )
}

export function Subtasks({
  goal,
  setGoal,
}: {
  goal: IGoal
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
}) {
  const removeTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.filter(subtask => subtask.id !== id),
    }))
  }

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {goal.subtasks?.length && (
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
          {goal.subtasks?.map(subtask => (
            <div className="relative" key={subtask.id}>
              <SubtaskItem
                subtask={subtask}
                removeTask={removeTask}
                setGoal={setGoal}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

function SubtaskItem({
  subtask,
  removeTask,
  setGoal,
}: {
  subtask: ITask
  removeTask: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
}) {
  return (
    <motion.div
      layout
      id={`subtask_${subtask.id}`}
      key={`subtask_${subtask.id}`}
      className="relative rounded-2xl bg-gray-300 p-2 drop-shadow-xl"
      variants={formVariants}
      initial="addInitial"
      animate="default"
      exit="remove"
    >
      <motion.button
        layout
        className="absolute top-[-10px] right-[-5px] z-10 h-8 w-8 rounded-full bg-gray-400 drop-shadow-md hover:bg-gray-500"
        onClick={e => removeTask(e, subtask.id)}
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
            <TextInput
              id={`subtask_title_${subtask.id}`}
              value={subtask.title}
              setValue={(input: string) =>
                setGoal(prev => ({
                  ...prev,
                  subtasks: prev.subtasks?.map(task =>
                    task.id === subtask.id ? { ...task, title: input } : task
                  ),
                }))
              }
              inputName="task_title"
              label="Task title"
            />
          </motion.div>

          <motion.div
            layout
            key={`subtask_duration_${subtask.id}`}
            className="relative"
          >
            <DurationInput
              id={`subtask_duration_${subtask.id}`}
              duration={subtask.duration}
              setDuration={(hours: string, minutes: string) =>
                setGoal(prev => ({
                  ...prev,
                  subtasks: prev.subtasks?.map(task =>
                    task.id === subtask.id
                      ? {
                          ...task,
                          duration: {
                            hours: Number(hours),
                            minutes: Number(minutes),
                          },
                        }
                      : task
                  ),
                }))
              }
            />
          </motion.div>

          {subtask.inputOrder.map(input => {
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
                  <PriorityInput
                    id={`subtask_priority_${subtask.id}`}
                    value={subtask.priority}
                    setValue={(input: PriorityType) =>
                      setGoal(prev => ({
                        ...prev,
                        subtasks: prev.subtasks?.map(task =>
                          task.id === subtask.id
                            ? { ...task, priority: input }
                            : task
                        ),
                      }))
                    }
                  />
                </motion.div>
              )
            }
            if (input === "targetDate") {
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
                  <DateInput
                    id={`subtask_target_date_${subtask.id}`}
                    value={subtask.targetDate}
                    setValue={(input: string) =>
                      setGoal(prev => ({
                        ...prev,
                        subtasks: prev.subtasks?.map(task =>
                          task.id === subtask.id
                            ? { ...task, targetDate: new Date(input) }
                            : task
                        ),
                      }))
                    }
                  />
                </motion.div>
              )
            }
          })}

          <motion.div layout className="mb-1">
            <AddTaskSections id={subtask.id} task={subtask} setGoal={setGoal} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
