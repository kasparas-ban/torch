import { useState } from "react"
import { AddNewModals, ModalState } from "../../components/AddNewModals"
import { Goal, ItemType } from "../../types"
import { ItemsHeader } from "./ItemsHeader"
import ItemsList from "./ItemsList"

const goals: Goal[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    title: 'Finish "The Shape of Space"',
    tasks: [],
  },
]

function ItemsPage() {
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
        />
        <ItemsList items={items} itemType={itemType} editMode={editMode} />
        <AddNewModals modal={modal} setModal={setModal} />
      </div>
    </div>
  )
}

export default ItemsPage
