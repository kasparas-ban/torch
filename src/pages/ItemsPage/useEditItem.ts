import { create } from "zustand"
import { GeneralItem } from "../../types"

type EditModeState = {
  editItem?: GeneralItem
  setEditItem: (newEditItem: GeneralItem | undefined) => void
}

const useEditItemStore = create<EditModeState>(set => ({
  editItem: undefined,
  setEditItem: (newEditItem: GeneralItem | undefined) =>
    set(() => ({ editItem: newEditItem })),
}))

const useEditItem = () => ({
  editItem: useEditItemStore(state => state.editItem),
  setEditItem: useEditItemStore(state => state.setEditItem),
})

export default useEditItem
