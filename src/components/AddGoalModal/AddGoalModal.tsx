import { useRef, useState } from "react"
import Modal from "react-modal"
import { ReactComponent as BackIcon } from "../../assets/back.svg"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"
import { ReactComponent as ArrowsIcon } from "../../assets/arrows.svg"
import { ReactComponent as CloseIcon } from "../../assets/close.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../assets/minus_small.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
import "./inputStyles.css"

interface IAddGoalModal {
  showModal: boolean
  closeModal: () => void
}

interface IGoal {
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  deadline?: Date | null
  dream?: any | null
  subtasks?: ITask[]
  inputOrder: string[]
}

interface ITask {
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  duration?: number | null
  deadline?: Date | null
}

function AddGoalModal({ showModal, closeModal }: IAddGoalModal) {
  const defaultGoal = { title: "", inputOrder: [] }
  const [goal, setGoal] = useState<IGoal>(defaultGoal)

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={{
        content: {
          outline: "none",
          overflowY: "auto",
          maxHeight: "80vh",
          scrollbarGutter: "stable both-edges",
        },
      }}
      className="absolute inset-0 m-auto mx-auto w-full border border-gray-200 bg-white p-5 sm:h-fit sm:max-w-xl sm:rounded sm:border"
      appElement={document.getElementById("root") || undefined}
    >
      <button onClick={closeModal}>
        <BackIcon />
      </button>
      <div className="text-center text-5xl font-semibold">New Goal</div>
      <div className="mx-auto">
        <GoalForm goal={goal} setGoal={setGoal} />
      </div>
    </Modal>
  )
}

function GoalForm({
  goal,
  setGoal,
}: {
  goal: IGoal
  setGoal: React.Dispatch<React.SetStateAction<IGoal>>
}) {
  const defaultTask = { title: "" }

  const addSubtask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGoal(prev => ({
      ...prev,
      subtasks: [...(prev.subtasks ? prev.subtasks : []), defaultTask],
    }))
  }

  return (
    <div className="px-0 pt-4 pb-2 sm:px-10">
      <form className="mt-6">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <TextInput inputName="goal_title" label="Goal title" />
          </div>

          {goal.inputOrder.map(input => {
            if (input === "dream")
              return (
                goal.dream !== undefined && (
                  <div className="relative">
                    <TextInput inputName="goal_dream" label="Dream" />
                  </div>
                )
              )
            if (input === "priority")
              return (
                goal.priority && (
                  <div className="relative">
                    <PriorityInput />
                  </div>
                )
              )
            return (
              goal.deadline !== undefined && (
                <div className="relative">
                  <DateInput />
                </div>
              )
            )
          })}
        </div>

        <AddGoalSections goal={goal} setGoal={setGoal} />

        {!!goal.subtasks?.length && <Subtasks goal={goal} setGoal={setGoal} />}

        <div className="relative mt-6 mb-5 flex justify-center">
          <button
            className="flex px-3 py-1 text-[15px] text-gray-500"
            onClick={addSubtask}
          >
            <div className="relative bottom-px">
              <PlusSmallIcon />
            </div>
            Add Subtask
          </button>
        </div>

        <div className="relative mb-2 flex justify-center">
          <button className="px-3 py-1 text-xl font-medium">Save</button>
        </div>
      </form>
    </div>
  )
}

function AddTaskSections() {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      <button className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600">
        Recurring
        <div className="relative top-1 ml-0.5">
          <PlusSmallIcon className="h-4 w-4" />
        </div>
      </button>
      <button className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600">
        Deadline
        <div className="relative top-1 ml-0.5">
          <PlusSmallIcon className="h-4 w-4" />
        </div>
      </button>
      <button className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-400 hover:text-gray-600">
        Priority
        <div className="relative top-1 ml-0.5">
          <PlusSmallIcon className="h-4 w-4" />
        </div>
      </button>
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
  const addDeadline = () =>
    setGoal(prev => ({
      ...prev,
      deadline: null,
      inputOrder: [...prev.inputOrder, "deadline"],
    }))
  const removeDeadline = () =>
    setGoal(prev => ({
      ...prev,
      deadline: undefined,
      inputOrder: prev.inputOrder.filter(input => input !== "deadline"),
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
    <div className="my-4 flex flex-wrap justify-center gap-2">
      <button
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300"
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
        className="flex rounded-xl bg-gray-200 px-3 py-1 text-[15px] text-gray-500 drop-shadow hover:bg-gray-300"
        onClick={e => {
          e.preventDefault()
          goal.deadline === undefined ? addDeadline() : removeDeadline()
        }}
      >
        Deadline
        <div className="relative top-1 ml-0.5">
          {goal.deadline === undefined ? (
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
    </div>
  )
}

function Subtasks({
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
            <div className="relative mb-1">
              <TextInput inputName="task_title" label="Task title" />
            </div>
            <div className="relative mb-8">
              <DurationInput />
            </div>
            <div className="relative mt-8">
              <DateInput />
            </div>
            <div className="mt-4 mb-1">
              <AddTaskSections />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function PriorityInput() {
  return (
    <>
      <label
        htmlFor="priority"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Priority
      </label>
      <ul className="grid w-full gap-2 min-[400px]:grid-cols-3">
        <li>
          <input
            type="radio"
            id="priority-low"
            name="priority"
            value="0"
            className="peer hidden"
            required
          />
          <label
            htmlFor="priority-low"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:shadow-none peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            Low
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="priority-medium"
            name="priority"
            value="1"
            defaultChecked
            className="peer hidden"
          />
          <label
            htmlFor="priority-medium"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            Medium
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="priority-high"
            name="priority"
            value="2"
            className="peer hidden"
          />
          <label
            htmlFor="priority-high"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-200 peer-checked:bg-blue-200 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            High
          </label>
        </li>
      </ul>
    </>
  )
}

function DateInput() {
  const [dateInput, setDateInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <label
        htmlFor="goal_deadline"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Deadline
      </label>
      <input
        id="goal_deadline"
        name="goal_deadline"
        ref={inputRef}
        type="date"
        className={`${
          dateInput ? "text-gray-900" : "empty-date"
        } peer h-10 w-full cursor-text rounded-2xl bg-gray-200 px-4  focus:bg-white focus:outline-2 focus:outline-blue-500/50 `}
        placeholder="Aa..."
        onFocus={e => e.target.showPicker()}
        onClick={e => (e.target as HTMLInputElement).showPicker()}
        onChange={e => setDateInput(e.target.value)}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
    </>
  )
}

function TextInput({
  inputName,
  label,
}: {
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputName}
        name={inputName}
        ref={inputRef}
        type="text"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="Aa..."
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
    </div>
  )
}

function NumberInput({
  inputName,
  label,
  icon,
  placeholder,
}: {
  inputName: string
  label?: string
  icon?: JSX.Element
  placeholder?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputName}
        name={inputName}
        ref={inputRef}
        type="number"
        className={`peer h-10 w-full rounded-2xl bg-gray-200 ${
          icon ? "pl-10" : "pl-4"
        } pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50`}
        placeholder={placeholder ?? "Aa..."}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      {icon && (
        <div
          className="absolute left-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:text-gray-700"
          onClick={() => inputRef?.current?.focus()}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

function TimeInput({
  inputName,
  label,
}: {
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={inputName}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={inputName}
        name={inputName}
        ref={inputRef}
        type="number"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="1"
        min={0}
        max={99}
        value={inputValue}
        onChange={e => {
          console.log(
            e.target.value,
            Number(e.target.value),
            Number(e.target.value.length) < 3
          )
          Number(e.target.value.length) < 3 && setInputValue(e.target.value)
        }}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      <div
        className={`absolute left-8 bottom-2 cursor-text px-4 pl-2 transition-all ${
          inputValue ? "text-gray-600" : "text-gray-400"
        } peer-focus:text-gray-600`}
        onClick={() => inputRef?.current?.focus()}
      >
        hours
      </div>
    </div>
  )
}

function DurationInput() {
  return (
    <div className="w-full">
      <label
        htmlFor="duration_input"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Duration
      </label>
      <div className="flex gap-2">
        <TimeInput inputName="time" />
        <div className="my-auto text-gray-400">
          <ArrowsIcon />
        </div>
        <NumberInput inputName="time" icon={<TimerIcon />} placeholder="2" />
      </div>
    </div>
  )
}

export default AddGoalModal
