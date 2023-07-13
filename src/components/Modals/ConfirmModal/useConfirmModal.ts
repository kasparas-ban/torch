import { create } from "zustand"

type ModalState = {
  isOpen: boolean
  title: string
  handleSubmit?: () => Promise<void>
  openModal: (handleSubmit: () => Promise<void>, title: string) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  title: '',
  openModal: (handleSubmit: () => Promise<void>, title: string) => set(() => ({ isOpen: true, handleSubmit, title })),
  closeModal: () => set(() => ({ isOpen: false })),
}))

const useConfirmModal = () => ({
  isOpen: useModalStore(state => state.isOpen),
  title: useModalStore(state => state.title),
  handleSubmit: useModalStore(state => state.handleSubmit),
  openModal: useModalStore(state => state.openModal),
  closeModal: useModalStore(state => state.closeModal),
})

export default useConfirmModal
