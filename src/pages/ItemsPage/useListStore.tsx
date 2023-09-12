import { create } from "zustand"
import { persist } from "zustand/middleware"
import { GeneralItem, ItemType } from "@/types"
import { ItemResponse } from "@/API/helpers"

type CollapsedItemState = {
  itemId: number
  itemType: ItemType
}

interface ItemListState {
  // Collaped items
  collapsedItems: CollapsedItemState[]
  isItemCollapsed: (item: GeneralItem) => boolean
  saveCollapseState: (item: CollapsedItemState, isCollapsed: boolean) => void

  // Item type header
  itemType: ItemType
  saveItemType: (type: ItemType) => void

  // Items
  items: ItemResponse[]
  setItems: (items: ItemResponse[]) => void
}

const useListStore = create<ItemListState>()(
  persist(
    (set, get) => ({
      // Collaped items
      collapsedItems: [],
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

      // Item type header
      itemType: "GOAL",
      saveItemType: (type: ItemType) => set({ itemType: type }),

      // Items
      items: [],
      setItems: (items: ItemResponse[]) =>
        set({
          items,
        }),
    }),
    {
      name: "item-list-storage",
    },
  ),
)

export default useListStore
