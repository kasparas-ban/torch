import { useRef, useState } from "react"
import Modal from "react-modal"
import { ReactComponent as BackIcon } from "../../assets/back.svg"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import "./dateInput.css"

interface IAddGoalModal {
  showModal: boolean
  closeModal: () => void
}

function AddGoalModal({ showModal, closeModal }: IAddGoalModal) {
  return (
    <Modal
      isOpen={showModal}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
      className="absolute inset-0 m-auto mx-auto w-full border-gray-200 bg-white p-5 sm:h-fit sm:max-w-xl sm:rounded sm:border"
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
      <form className="mt-12">
        <div className="relative mb-8">
          <TitleInput />
        </div>

        <div className="relative mb-8">
          <PriorityInput />
        </div>

        <div className="relative mb-8">
          <DateInput />
        </div>

        <div className="relative mb-5 flex justify-center">
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

function TitleInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        id="goal_title"
        name="goal_title"
        ref={inputRef}
        type="text"
        className="peer h-10 w-full rounded-2xl bg-gray-200 px-4 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="Aa..."
      />
      <label
        htmlFor="goal_title"
        className="absolute left-0 -top-[22px] cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Goal title
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
        } peer h-10 w-full rounded-2xl bg-gray-200 px-4  focus:bg-white focus:outline-2 focus:outline-blue-500/50 `}
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

export default AddGoalModal
