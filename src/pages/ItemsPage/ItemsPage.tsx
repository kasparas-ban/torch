import useListStore from "./useListStore"
import { ItemsHeader } from "./ItemsHeader"
import { useItemsList } from "../../API/api"
import ItemsList from "./ItemsList/ItemsList"
import { GeneralItem } from "../../types"
import ItemListSkeleton from "./ItemsList/ItemListSkeleton"
import { AnimatePresence } from "framer-motion"
import { groupItemsByParent } from "@/API/helpers"

function ItemsPage() {
  const { itemType } = useListStore()
  const { data, isLoading } = useItemsList()
  const items =
    itemType === "TASK"
      ? data?.tasks
      : itemType === "GOAL"
      ? data?.goals
      : data?.dreams

  const groupedItems = items ? groupItemsByParent(items, itemType) : {}

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-full max-w-[650px]">
        <ItemsHeader itemType={itemType} />
        <AnimatePresence mode="sync">
          {isLoading ? (
            <ItemListSkeleton />
          ) : (
            <ItemsList<GeneralItem>
              groupedItems={groupedItems}
              itemType={itemType}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ItemsPage
