import { ReactComponent as FilterIcon } from "../assets/filter.svg"
import { ReactComponent as PlusIcon } from "../assets/plus.svg"
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg"

function GoalsPage() {
  return (
    <div className="mt-4 flex justify-between max-[768px]:px-6 md:justify-center md:space-x-36">
      <div className="w-[650px]">
        <GoalsHeader />
        <GoalsList />
      </div>
    </div>
  )
}

function GoalsHeader() {
  return (
    <div className="mb-8 flex">
      <div className="flex cursor-pointer">
        <div className="text-6xl font-bold">Goals</div>
        <ArrowIcon className="mx-2 mt-7" />
      </div>
      <div className="mt-7 ml-auto flex space-x-4">
        <FilterIcon className="cursor-pointer" />
        <PlusIcon className="cursor-pointer" />
      </div>
    </div>
  )
}

function GoalsList() {
  return (
    <ul className="space-y-3">
      <GoalItem />
      <GoalItem />
      <GoalItem />
    </ul>
  )
}

function GoalItem() {
  return (
    <li>
      <div className="flex cursor-pointer rounded-full bg-red-400 py-3 px-6">
        <div>Finish "The Shape of Space"</div>
        <ArrowIcon className="ml-auto" />
      </div>
    </li>
  )
}

export default GoalsPage
