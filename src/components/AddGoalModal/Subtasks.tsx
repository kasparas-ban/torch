import { IGoal, ITask } from "./AddGoalModal"
import {
  DateInput,
  DurationInput,
  PriorityInput,
  PriorityType,
  TextInput,
} from "./Inputs"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../assets/minus_small.svg"
import { ReactComponent as CloseIcon } from "../../assets/close.svg"

export function AddTaskSections({
  idx,
  task,
  setGoal,
}: {
  idx: number
  task: ITask
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
}) {
  const addRecurring = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map((task, index) =>
        idx === index
          ? {
              ...task,
              recurring: true,
            }
          : task
      ),
    }))
  const removeRecurring = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map((task, index) =>
        idx === index
          ? {
              ...task,
              recurring: undefined,
            }
          : task
      ),
    }))

  const addDeadline = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map((task, index) =>
        idx === index
          ? {
              ...task,
              deadline: null,
              inputOrder: [...task.inputOrder, "deadline"],
            }
          : task
      ),
    }))
  const removeDeadline = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map((task, index) =>
        idx === index
          ? {
              ...task,
              deadline: undefined,
              inputOrder: task.inputOrder.filter(input => input !== "deadline"),
            }
          : task
      ),
    }))

  const addPriority = () =>
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.map((task, index) =>
        idx === index
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
      subtasks: prev.subtasks?.map((task, index) =>
        idx === index
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
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600"
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
          task.deadline === undefined ? addDeadline() : removeDeadline()
        }}
      >
        Deadline
        <div className="relative top-1 ml-0.5">
          {task.deadline === undefined ? (
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
    idx: number
  ) => {
    e.preventDefault()
    setGoal(prev => ({
      ...prev,
      subtasks: prev.subtasks?.filter((_, index) => index !== idx),
    }))
  }

  return (
    <>
      <div className="mb-1 px-4 text-sm text-gray-600">Subtasks</div>
      <div className="flex flex-col gap-4">
        {goal.subtasks?.map((subtask, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl bg-gray-300 p-2 drop-shadow-xl"
          >
            <button
              className="absolute top-[-10px] right-[-5px] z-10 h-8 w-8 rounded-full bg-gray-400 drop-shadow-md hover:bg-gray-500"
              onClick={e => removeTask(e, idx)}
            >
              <CloseIcon className="m-auto h-full w-6 text-gray-200" />
            </button>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <TextInput inputName="task_title" label="Task title" />
              </div>

              <div className="relative">
                <DurationInput />
              </div>

              {subtask.inputOrder.map(input => {
                if (input === "priority")
                  return (
                    <div key={`subtask_priority_${idx}}`} className="relative">
                      <PriorityInput
                        id={`subtask_priority_${idx}`}
                        value={subtask.priority}
                        setValue={(input: PriorityType) =>
                          setGoal(prev => ({
                            ...prev,
                            subtasks: prev.subtasks?.map((task, index) =>
                              index === idx
                                ? { ...task, priority: input }
                                : task
                            ),
                          }))
                        }
                      />
                    </div>
                  )
                return (
                  <div key={`subtask_deadline_${idx}}`} className="relative">
                    <DateInput
                      id={`subtask_deadline_${idx}`}
                      value={subtask.deadline}
                      setValue={(input: string) =>
                        setGoal(prev => ({
                          ...prev,
                          subtasks: prev.subtasks?.map((task, index) =>
                            index === idx
                              ? { ...task, deadline: new Date(input) }
                              : task
                          ),
                        }))
                      }
                    />
                  </div>
                )
              })}

              <div className="mb-1">
                <AddTaskSections idx={idx} task={subtask} setGoal={setGoal} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
