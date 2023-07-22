import { useState } from "react"
import { useItems } from "../../api"
import ItemsList from "./ItemsList"
import { ItemsHeader } from "./ItemsHeader"
import { GeneralItem, ItemType } from "../../types"
import GeneralModal from "../../components/Modals/GeneralModal/GeneralModal"
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal"

function ItemsPage() {
  const [editMode, setEditMode] = useState(false)

  const [itemType, setItemType] = useState<ItemType>("GOAL")

  const { data: items } = useItems(itemType)

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
