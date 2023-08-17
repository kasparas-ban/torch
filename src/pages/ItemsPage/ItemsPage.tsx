import { useState } from "react"
import { ItemsHeader } from "./ItemsHeader"
import { useItemsList } from "../../API/api"
import ItemsList from "./ItemsList/ItemsList"
import { GeneralItem, ItemType } from "../../types"
import GeneralModal from "../../components/Modals/GeneralModal/GeneralModal"
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal"

function ItemsPage() {
  const [itemType, setItemType] = useState<ItemType>("GOAL")
  const { data } = useItemsList(itemType)

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px]">
        <ItemsHeader itemType={itemType} setItemType={setItemType} />
        <ItemsList<GeneralItem> groupedItems={data} itemType={itemType} />
        <ConfirmModal />
      </div>
    </div>
  )
}

export default ItemsPage
