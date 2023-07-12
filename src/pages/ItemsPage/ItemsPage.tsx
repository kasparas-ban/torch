import { useState } from "react"
import { AddNewModals, ModalState } from "../../components/AddNewModals"
import { GeneralItem, ItemType } from "../../types"
import { dreamsData, goalsData, tasksData } from "../../data/data"
import { ItemsHeader } from "./ItemsHeader"
import ItemsList from "./ItemsList"

function ItemsPage() {
  const [editMode, setEditMode] = useState(false)
  const [modal, setModal] = useState<ModalState>({
    showBackground: false,
    isAddTaskModalOpen: false,
  })

  const [itemType, setItemType] = useState<ItemType>("GOAL")
  const items =
    itemType === "TASK"
      ? tasksData
      : itemType === "GOAL"
      ? goalsData
      : dreamsData

  const openGeneralModal = () =>
    setModal({ showBackground: true, isGeneralModalOpen: true })

  const openEditItemModal = (itemType: ItemType, addNewSubItem?: boolean) =>
    setModal({
      showBackground: true,
      ...(itemType === "TASK"
        ? { isAddTaskModalOpen: true }
        : itemType === "GOAL"
        ? { isAddGoalModalOpen: true, addNewSubItem: !!addNewSubItem }
        : { isAddDreamModalOpen: true }),
    })

  const openConfirmModal = (title: string, confirmFn: () => Promise<void>) =>
    setModal({
      showBackground: true,
      isConfirmModalOpen: true,
      confirmModalData: { title, confirmFn },
    })

  return (
    <div className="mt-4 flex justify-center max-[768px]:px-6 md:space-x-36">
      <div className="w-[650px]">
        <ItemsHeader
          openGeneralModal={openGeneralModal}
          itemType={itemType}
          setItemType={setItemType}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <ItemsList<GeneralItem>
          items={items}
          itemType={itemType}
          editMode={editMode}
          openEditItemModal={openEditItemModal}
          openConfirmModal={openConfirmModal}
        />
        <AddNewModals modal={modal} setModal={setModal} />
      </div>
    </div>
  )
}

export default ItemsPage
