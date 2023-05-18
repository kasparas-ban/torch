import { useState } from "react"
import { AddNewModals, ModalState } from "../../components/AddNewModals"
import { GeneralItem, Goal, ItemType } from "../../types"
import { ItemsHeader } from "./ItemsHeader"
import ItemsList from "./ItemsList"

const goalsData: Goal[] = [
  {
    goalId: 1,
    title: "Make a todo/timer app",
    progress: 0.3,
    targetDate: new Date("2023-09-01"),
    priority: "HIGH",
    tasks: [
      {
        taskId: 100,
        title: "Make a Figma sketch",
        progress: 0.2,
        duration: { hours: 2, minutes: 0 },
        priority: "HIGH",
      },
      {
        taskId: 200,
        title: "Learn Next.js",
        progress: 0.3,
        duration: { hours: 2, minutes: 0 },
        priority: "LOW",
      },
      {
        taskId: 300,
        title: "Code frontend",
        progress: 0.4,
        duration: { hours: 2, minutes: 0 },
        targetDate: new Date("2023-08-01"),
        priority: "HIGH",
      },
    ],
  },
  {
    goalId: 2,
    title: "Learn to play chess",
    progress: 0.67,
    priority: "LOW",
    tasks: [
      {
        taskId: 400,
        title: "Learn chess rules",
        progress: 0.54,
        duration: { hours: 2, minutes: 0 },
      },
      {
        taskId: 500,
        title: "Learn opening moves",
        progress: 0.89,
        duration: { hours: 2, minutes: 0 },
      },
      {
        taskId: 600,
        title: "Play a match with someone",
        progress: 0.61,
        duration: { hours: 2, minutes: 0 },
        recurring: true,
      },
    ],
  },
  {
    goalId: 3,
    title: 'Finish "The Shape of Space"',
    progress: 0.94,
    tasks: [],
    priority: "MEDIUM",
  },
]

function ItemsPage() {
  const [editItem, setEditItem] = useState<GeneralItem | undefined>()
  const [editMode, setEditMode] = useState(false)
  const [modal, setModal] = useState<ModalState>({
    showBackground: false,
    isAddTaskModalOpen: false,
  })

  const [itemType, setItemType] = useState<ItemType>("GOAL")
  const items = itemType === "TASK" ? [] : itemType === "GOAL" ? goalsData : []

  const openGeneralModal = () =>
    setModal({ showBackground: true, isGeneralModalOpen: true })

  const openEditItemModal = (itemType: ItemType) =>
    setModal({
      showBackground: true,
      ...(itemType === "TASK"
        ? { isAddTaskModalOpen: true }
        : itemType === "GOAL"
        ? { isAddGoalModalOpen: true }
        : { isAddDreamModalOpen: true }),
    })

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-[650px]">
        <ItemsHeader
          openGeneralModal={openGeneralModal}
          itemType={itemType}
          setItemType={setItemType}
          editMode={editMode}
          setEditMode={setEditMode}
          setEditItem={setEditItem}
        />
        <ItemsList
          items={items}
          itemType={itemType}
          editMode={editMode}
          editItem={editItem}
          setEditItem={setEditItem}
          openEditItemModal={openEditItemModal}
        />
        <AddNewModals modal={modal} setModal={setModal} editItem={editItem} />
      </div>
    </div>
  )
}

export default ItemsPage
