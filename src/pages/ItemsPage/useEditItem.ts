import { create } from 'zustand'
import { GeneralItem } from '../../types'

type EditItemState = {
  editItem?: GeneralItem
  setEditItem: (newEditItem: GeneralItem | undefined) => void
}

const useEditItemStore = create<EditItemState>((set) => ({
  editItem: undefined,
  setEditItem: (newEditItem: GeneralItem | undefined) => set(() => ({ editItem: newEditItem })),
}))

const useEditItem = () => ({
  editItem: useEditItemStore((state) => state.editItem),
  setEditItem: useEditItemStore((state) => state.setEditItem)
})

export default useEditItem