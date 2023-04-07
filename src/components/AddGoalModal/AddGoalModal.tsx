import { useRef, useState } from "react"
import Modal from "react-modal"
import { ReactComponent as BackIcon } from "../../assets/back.svg"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"
import { ReactComponent as ArrowsIcon } from "../../assets/arrows.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as TimerIcon } from "../../assets/navigation_icons/timer.svg"
import "./inputStyles.css"

interface IAddGoalModal {
  showModal: boolean
  closeModal: () => void
}

function AddGoalModal({ showModal, closeModal }: IAddGoalModal) {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={{ content: { outline: "none" } }}
      className="absolute inset-0 m-auto mx-auto w-full border border-gray-200 bg-white p-5 sm:h-fit sm:max-w-xl sm:rounded sm:border"
      appElement={document.getElementById("root") || undefined}
    >
      <button onClick={closeModal}>
        <BackIcon />
      </button>
      <div className="text-center text-5xl font-semibold">New Goal</div>
      <div className="mx-auto">
        <GoalForm />
      </div>
    </Modal>
  )
}

function GoalForm() {
  return (
    <div className="px-0 pt-4 pb-8 sm:px-10">
      <form className="mt-6">
        <div className="relative mb-8">
          <TextInput inputName="goal_title" label="Goal title" />
        </div>

        <div className="relative mb-8">
          <PriorityInput />
        </div>

        <div className="relative mb-3">
          <DateInput />
        </div>

        <Subtasks />

        <div className="relative mt-6 mb-5 flex justify-center">
          <button className="flex px-3 py-1 text-[15px] text-gray-500">
            <div className="relative bottom-px">
              <PlusSmallIcon />
            </div>
            Add Subtask
          </button>
        </div>

        <div className="relative flex justify-center">
          <button className="px-3 py-1 text-xl font-medium">Save</button>
        </div>
      </form>
    </div>
  )
}

function Subtasks() {
  return (
    <>
      <div className="mb-1 px-4 text-sm text-gray-600">Subtasks</div>
      <div className="rounded-2xl bg-gray-300 px-2 py-2">
        <div className="relative mb-1">
          <TextInput inputName="task_title" label="Task title" />
        </div>
        <div className="relative mb-8">
          <DurationInput />
        </div>
        <div className="relative mt-8">
          <DateInput />
        </div>
      </div>
    </>
  )
}

function PriorityInput() {
  return (
    <>
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
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-500/50 peer-checked:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
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
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-500/50 peer-checked:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
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
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-500/50 peer-checked:text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            High
          </label>
        </li>
      </ul>
      <label
        htmlFor="priority"
        className="absolute left-0 -top-[22px] cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-gray-600"
      >
        Priority
      </label>
    </>
  )
}

function DateInput() {
  const [dateInput, setDateInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
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
      <label
        htmlFor="goal_deadline"
        className="absolute left-0 -top-[22px] cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Deadline
      </label>
      <div
        className="absolute right-0 top-2 cursor-text px-4 text-gray-400 transition-all peer-focus:hidden"
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
        className="absolute left-8 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:text-gray-600"
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
