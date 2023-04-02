import { useState } from "react"
import { ReactComponent as FilterIcon } from "../assets/filter.svg"
import { ReactComponent as PlusIcon } from "../assets/plus.svg"
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg"
import { ReactComponent as TimerStartIcon } from "../assets/timer_start.svg"
import AddGoalModal from "../components/AddGoalModal/AddGoalModal"

interface Task {
  title: string
}

interface Goal {
  title: string
  tasks: Task[]
}

const goals: Goal[] = [
  {
    title: "Make a todo app",
    tasks: [
      {
        title: "Make a Figma sketch",
      },
      {
        title: "Learn Next.js",
      },
      {
        title: "Make a timer app",
      },
    ],
  },
  {
    title: "Learn to play chess",
    tasks: [
      {
        title: "Learn chess rules",
      },
      {
        title: "Learn opening moves",
      },
      {
        title: "Play a match with dad",
      },
    ],
  },
  {
    title: 'Finish "The Shape of Space"',
    tasks: [],
  },
]

function GoalsPage() {
  const [modalIsOpen, setModalIsOpen] = useState(true)

  return (
    <div className="mt-4 flex justify-between max-[768px]:px-6 md:justify-center md:space-x-36">
      <div className="w-[650px]">
        <GoalsHeader openAddGoalModal={() => setModalIsOpen(true)} />
        <GoalsList goals={goals} />
        <AddGoalModal
          modalIsOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
        />
      </div>
    </div>
  )
}

function GoalsHeader({ openAddGoalModal }: { openAddGoalModal: () => void }) {
  return (
    <div className="mb-8 flex">
      <div className="flex cursor-pointer">
        <div className="text-6xl font-bold">Goals</div>
        <ArrowIcon className="mx-2 mt-7" />
      </div>
      <div className="mt-7 ml-auto flex space-x-4">
        <FilterIcon className="cursor-pointer" />
        <PlusIcon className="cursor-pointer" onClick={openAddGoalModal} />
      </div>
    </div>
  )
}

function GoalsList({ goals }: { goals: Goal[] }) {
  return (
    <ul className="space-y-3">
      {goals.map(goal => (
        <GoalItem goal={goal} />
      ))}
    </ul>
  )
}

function GoalItem({ goal }: { goal: Goal }) {
  const [showSublist, setShowSublist] = useState(true)
  const containsSublist = !!goal.tasks.length

  return (
    <li>
      <div
        onClick={() => setShowSublist(prev => !prev)}
        className="flex space-x-3"
      >
        <div className="flex w-full cursor-pointer rounded-full bg-red-400 py-3 px-6">
          <div>{goal.title}</div>
          {containsSublist && (
            <ArrowIcon
              className={`ml-auto ${showSublist ? "rotate-180" : ""}`}
            />
          )}
        </div>
        {!containsSublist && (
          <div className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400">
            <TimerStartIcon className="m-auto h-full" />
          </div>
        )}
      </div>
      {showSublist && <GoalSublist tasks={goal.tasks} />}
    </li>
  )
}

function GoalSublist({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <ul className="mt-3 ml-6 space-y-3">
        {tasks.map(task => (
          <li className="flex space-x-3">
            <div className="my-auto aspect-square w-4 rounded-full bg-gray-500"></div>
            <div className="flex w-full cursor-pointer rounded-full bg-red-400 py-3 px-6">
              <div>{task.title}</div>
            </div>
            <div className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400">
              <TimerStartIcon className="m-auto h-full" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GoalsPage
