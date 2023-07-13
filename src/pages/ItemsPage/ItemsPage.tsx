import { useState } from "react"
import { GeneralItem, ItemType } from "../../types"
import { dreamsData, goalsData, tasksData } from "../../data/data"
import { ItemsHeader } from "./ItemsHeader"
import ItemsList from "./ItemsList"
import GeneralModal from "../../components/Modals/GeneralModal/GeneralModal"
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal"

function ItemsPage() {
  const [editMode, setEditMode] = useState(false)

  const [itemType, setItemType] = useState<ItemType>("GOAL")
  const items =
    itemType === "TASK"
      ? tasksData
      : itemType === "GOAL"
      ? goalsData
      : dreamsData

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-[650px]">
        <ItemsHeader
          itemType={itemType}
          setItemType={setItemType}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <ItemsList<GeneralItem>
          items={items}
          itemType={itemType}
          editMode={editMode}
        />
        <GeneralModal />
        <ConfirmModal />
      </div>
    </div>
  )
}

export default ItemsPage
