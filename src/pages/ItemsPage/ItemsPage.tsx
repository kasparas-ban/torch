import { useState } from "react"
import { AddNewModals, ModalState } from "../../components/AddNewModals"
import { Goal, ItemType, Task } from "../../types"
import { ItemsHeader } from "./ItemsHeader"
import ItemsList from "./ItemsList"

const goals: Goal[] = [
  {
    goalId: 1,
    title: "Make a todo app",
    progress: 0.3,
    tasks: [
      {
        taskId: 1,
        title: "Make a Figma sketch",
        progress: 0.2,
      },
      {
        taskId: 2,
        title: "Learn Next.js",
        progress: 0.3,
      },
      {
        taskId: 3,
        title: "Make a timer app",
        progress: 0.4,
      },
    ],
  },
  {
    goalId: 2,
    title: "Learn to play chess",
    progress: 0.67,
    tasks: [
      {
        taskId: 4,
        title: "Learn chess rules",
        progress: 0.54,
      },
      {
        taskId: 5,
        title: "Learn opening moves",
        progress: 0.89,
      },
      {
        taskId: 6,
        title: "Play a match with dad",
        progress: 0.61,
      },
    ],
  },
  {
    goalId: 3,
    title: 'Finish "The Shape of Space"',
    progress: 0.94,
    tasks: [],
  },
]

function ItemsPage() {
  const [editItem, setEditItem] = useState<Goal | Task | undefined>()
  const [editMode, setEditMode] = useState(false)
  const [modal, setModal] = useState<ModalState>({
    showBackground: false,
    isAddTaskModalOpen: false,
  })

  const [itemType, setItemType] = useState<ItemType>("GOALS")
  const items = itemType === "TASKS" ? [] : itemType === "GOALS" ? goals : []

  const openGeneralModal = () =>
    setModal({ showBackground: true, isGeneralModalOpen: true })

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
        />
        <AddNewModals modal={modal} setModal={setModal} />
      </div>
    </div>
  )
}

export default ItemsPage
