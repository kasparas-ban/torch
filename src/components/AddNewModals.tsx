import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import AddGoalModal from "./AddGoalModal/AddGoalModal"
import AddGeneralModal from "./AddGeneralModal/AddGeneralModal"

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
}: {
  modal: ModalState
  setModal: React.Dispatch<React.SetStateAction<ModalState>>
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

  const openTaskModal = () =>
    setModal({ showBackground: true, isAddTaskModalOpen: true })
  const openGoalModal = () =>
    setModal({ showBackground: true, isAddGoalModalOpen: true })
  const openDreamModal = () =>
    setModal({ showBackground: true, isAddDreamModalOpen: true })

  const closeModal = () => setModal({ showBackground: false })

  return (
    <>
      <AddGeneralModal
        showModal={!!modal?.isGeneralModalOpen}
        openAddTaskModal={openTaskModal}
        openAddGoalModal={openGoalModal}
        openAddDreamModal={openDreamModal}
        closeModal={closeModal}
      />
      <AddGoalModal
        showModal={!!modal?.isAddGoalModalOpen}
        closeModal={closeModal}
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