import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import AddGoalModal from "./Modals/AddGoalModal/AddGoalModal"
import AddGeneralModal from "./Modals/AddGeneralModal/AddGeneralModal"
import AddTaskModal from "./Modals/AddTaskModal/AddTaskModal"
import AddDreamModal from "./Modals/AddDreamModal/AddDreamModal"
import { GeneralItem, Task } from "../types"

export interface ModalState {
  showBackground: boolean
  isGeneralModalOpen?: boolean
  isAddTaskModalOpen?: boolean
  isAddGoalModalOpen?: boolean
  isAddDreamModalOpen?: boolean
}

export function AddNewModals({
  modal,
  setModal,
  editItem,
  setEditItem,
}: {
  modal: ModalState
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
  editItem?: GeneralItem
  setEditItem: React.Dispatch<React.SetStateAction<GeneralItem | undefined>>
}) {
  const backgroundRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (e: MouseEvent) => {
    backgroundRef.current?.contains(e.target as Node) && closeModal()
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const openGeneralModal = () =>
    setModal({ showBackground: true, isGeneralModalOpen: true })
  const openTaskModal = () =>
    setModal({ showBackground: true, isAddTaskModalOpen: true })
  const openGoalModal = () =>
    setModal({ showBackground: true, isAddGoalModalOpen: true })
  const openDreamModal = () =>
    setModal({ showBackground: true, isAddDreamModalOpen: true })

  const closeModal = () => {
    setEditItem(undefined)
    setModal({ showBackground: false })
  }

  return (
    <>
      <AddGeneralModal
        showModal={!!modal?.isGeneralModalOpen}
        openAddTaskModal={openTaskModal}
        openAddGoalModal={openGoalModal}
        openAddDreamModal={openDreamModal}
        closeModal={closeModal}
      />
      <AddTaskModal
        showModal={!!modal?.isAddTaskModalOpen}
        handleBack={editItem ? closeModal : openGeneralModal}
        initialTask={editItem as Task | undefined}
      />
      <AddGoalModal
        showModal={!!modal?.isAddGoalModalOpen}
        handleBack={openGeneralModal}
      />
      <AddDreamModal
        showModal={!!modal?.isAddDreamModalOpen}
        handleBack={openGeneralModal}
      />
      {modal.showBackground && (
        <motion.div
          ref={backgroundRef}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.9,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
          className="absolute inset-0 z-10 bg-gray-200"
        />
      )}
    </>
  )
}
