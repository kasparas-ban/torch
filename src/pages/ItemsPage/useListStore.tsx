import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GeneralItem, ItemType } from "@/types"

type CollapsedItemState = {
  itemId: number
  itemType: ItemType
}

interface ItemListState {
  collapsedItems: CollapsedItemState[]
  isItemCollapsed: (item: GeneralItem) => boolean
  saveCollapseState: (item: CollapsedItemState, isCollapsed: boolean) => void
}

const useListStore = create<ItemListState>()(
  persist(
    (set, get) => ({
      collapsedItems: [] as CollapsedItemState[],
      isItemCollapsed: (item: GeneralItem) =>
        !!get().collapsedItems.find(
          collapsedItem =>
            collapsedItem.itemId === item.id &&
            collapsedItem.itemType === item.type,
        ),
      saveCollapseState: (item: CollapsedItemState, isCollapsed: boolean) =>
        set({
          collapsedItems: isCollapsed
            ? [...get().collapsedItems, item]
            : get().collapsedItems.filter(
                collapsedItem =>
                  !(
                    collapsedItem.itemId == item.itemId &&
                    collapsedItem.itemType == item.itemType
                  ),
              ),
        }),
    }),
    {
      name: "item-list-storage",
    },
  ),
)

export default useListStore
