import { useState } from "react"
import Modal from "react-modal"
import { ReactComponent as BackIcon } from "../../assets/back.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as MinusSmallIcon } from "../../assets/minus_small.svg"
import { DateInput, PriorityInput, PriorityType, TextInput } from "./Inputs"
import { Subtasks } from "./Subtasks"
import "./inputStyles.css"

interface IAddGoalModal {
  showModal: boolean
  closeModal: () => void
}

export interface IGoal {
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  deadline?: Date | null
  dream?: any | null
  subtasks?: ITask[]
  inputOrder: string[]
}

export interface ITask {
  title: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
  duration?: number | null
  deadline?: Date | null
  recurring?: boolean
  inputOrder: string[]
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
  const addSubtask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGoal(prev => ({
      ...prev,
      subtasks: [
        ...(prev.subtasks ? prev.subtasks : []),
        { title: "", inputOrder: [] },
      ],
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
                  <div key="goal_title" className="relative">
                    <TextInput inputName="goal_dream" label="Dream" />
                  </div>
                )
              )
            if (input === "priority")
              return (
                goal.priority && (
                  <div key="goal_priority" className="relative">
                    <PriorityInput
                      id="goal_priority"
                      value={goal.priority}
                      setValue={(input: PriorityType) =>
                        setGoal(prev => ({ ...prev, priority: input }))
                      }
                    />
                  </div>
                )
              )
            return (
              goal.deadline !== undefined && (
                <div key="goal_deadline" className="relative">
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

export default AddGoalModal
