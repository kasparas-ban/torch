import { create } from "zustand"
import { GeneralItem } from "../../types"

type EditModeState = {
  editItem?: GeneralItem
  editMode: boolean
  setEditItem: (newEditItem: GeneralItem | undefined) => void
  enableEditMode: () => void
  disableEditMode: () => void
}

const useEditModeStore = create<EditModeState>(set => ({
  editItem: undefined,
  editMode: false,
  setEditItem: (newEditItem: GeneralItem | undefined) =>
    set(() => ({ editItem: newEditItem })),
  enableEditMode: () => set(() => ({ editMode: true })),
  disableEditMode: () =>
    set(() => ({
      editMode: false,
      editItem: undefined,
    })),
}))

const useEditMode = () => ({
  editItem: useEditModeStore(state => state.editItem),
  editMode: useEditModeStore(state => state.editMode),
  setEditItem: useEditModeStore(state => state.setEditItem),
  enableEditMode: useEditModeStore(state => state.enableEditMode),
  disableEditMode: useEditModeStore(state => state.disableEditMode),
})

export default useEditMode
