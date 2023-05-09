import { useState } from "react"
import { AddNewModals, ModalState } from "../../components/AddNewModals"
import { Goal, ItemType, Task } from "../../types"
import { ItemsHeader } from "./ItemsHeader"
import ItemsList from "./ItemsList"

const goals: Goal[] = [
  {
    goalId: 1,
    title: "Make a todo app",
    tasks: [
      {
        taskId: 1,
        title: "Make a Figma sketch",
      },
      {
        taskId: 2,
        title: "Learn Next.js",
      },
      {
        taskId: 3,
        title: "Make a timer app",
      },
    ],
  },
  {
    goalId: 2,
    title: "Learn to play chess",
    tasks: [
      {
        taskId: 4,
        title: "Learn chess rules",
      },
      {
        taskId: 5,
        title: "Learn opening moves",
      },
      {
        taskId: 6,
        title: "Play a match with dad",
      },
    ],
  },
  {
    goalId: 3,
    title: 'Finish "The Shape of Space"',
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
