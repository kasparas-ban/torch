import { create } from "zustand"

type StorageState = {
  isStorageUsed: boolean
  setIsStorageUsed: (isUsed: boolean) => void
}

const useStorageStore = create<StorageState>(set => ({
  isStorageUsed: false,
  setIsStorageUsed: (isUsed: boolean) => set({ isStorageUsed: isUsed }),
}))

const useStorage = () => ({
  isStorageUsed: useStorageStore(state => state.isStorageUsed),
  setIsStorageUsed: useStorageStore(state => state.setIsStorageUsed),
})

export default useStorage
