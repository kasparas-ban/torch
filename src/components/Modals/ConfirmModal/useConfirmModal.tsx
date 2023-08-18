import { create } from "zustand"

type ModalState = {
  isOpen: boolean
  handleSubmit?: () => Promise<void>
  openItemDoneModal: (handleSubmit: () => Promise<void>) => void
  openRemoveItemModal: (handleSubmit: () => Promise<void>) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  openItemDoneModal: (handleSubmit: () => Promise<void>) =>
    set(() => ({
      isOpen: true,
      handleSubmit,
    })),
  openRemoveItemModal: (handleSubmit: () => Promise<void>) =>
    set(() => ({
      isOpen: true,
      handleSubmit,
    })),
  closeModal: () =>
    set(() => ({
      isOpen: false,
      title: undefined,
      key: undefined,
      content: undefined,
    })),
}))

const useConfirmModal = () => ({
  isOpen: useModalStore(state => state.isOpen),
  handleSubmit: useModalStore(state => state.handleSubmit),
  openItemDoneModal: useModalStore(state => state.openItemDoneModal),
  openRemoveItemModal: useModalStore(state => state.openRemoveItemModal),
  closeModal: useModalStore(state => state.closeModal),
})

export default useConfirmModal
