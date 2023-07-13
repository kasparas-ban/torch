import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useEditItem from "./useEditItem"
import { capitalizeString } from "../../helpers"
import { ItemType, ItemTypeLabel } from "../../types"
import { ReactComponent as FilterIcon } from "../../assets/filter.svg"
import { ReactComponent as EditIcon } from "../../assets/edit_pen.svg"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"
import useModal from "../../components/Modals/useModal"

const itemTypeMotion = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: { duration: 0.1 },
  },
}

const itemTypeMenuMotion = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.1 },
  },
}

export function ItemsHeader({
  itemType,
  setItemType,
  editMode,
  setEditMode,
}: {
  itemType: ItemType
  setItemType: (type: ItemType) => void
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { setEditItem } = useEditItem()
  const { openGeneralModal } = useModal()

  const toggleEditMode = () => {
    if (editMode) setEditItem(undefined)
    setEditMode(prev => !prev)
  }

  const closeEditMode = () => {
    setEditMode(false)
    setEditItem(undefined)
  }

  return (
    <div className="mb-8 flex">
      <ItemsTypeDropdown
        itemType={itemType}
        setItemType={setItemType}
        closeEditMode={closeEditMode}
      />
      <div className="mt-7 ml-auto flex space-x-4">
        <motion.div
          layout
          whileHover={{ scale: 1.2 }}
          onClick={toggleEditMode}
          className="relative top-[-6px]"
        >
          <motion.div
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ${
              editMode ? "bg-red-400" : ""
            }`}
          >
            <EditIcon />
          </motion.div>
        </motion.div>
        <motion.div layout whileHover={{ scale: 1.2 }} onClick={closeEditMode}>
          <FilterIcon className="cursor-pointer" />
        </motion.div>
        <motion.div layout whileHover={{ scale: 1.2 }}>
          <PlusIcon
            className="cursor-pointer"
            onClick={() => {
              closeEditMode()
              openGeneralModal()
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

function ItemsTypeDropdown({
  itemType,
  setItemType,
  closeEditMode,
}: {
  itemType: ItemType
  setItemType: (type: ItemType) => void
  closeEditMode: () => void
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownSelectRef = useRef<HTMLDivElement | null>(null)
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

  const selectedLabel =
    itemType === "TASK" ? "Tasks" : itemType === "GOAL" ? "Goals" : "Dreams"
  const typeOptions = ["Tasks", "Goals", "Dreams"].filter(
    type => type !== selectedLabel
  ) as ItemTypeLabel[]

  const handleTypeChange = (type: ItemTypeLabel) => {
    const selectedType =
      type === "Tasks" ? "TASK" : type === "Goals" ? "GOAL" : "DREAM"
    setItemType(selectedType)
  }

  useEffect(() => {
    if (!dropdownMenuRef.current) return

    const onClick = (event: Event) => {
      const clickInside =
        dropdownMenuRef.current?.contains(event.target as Node) ||
        dropdownSelectRef.current?.contains(event.target as Node)
      if (isDropdownOpen && !clickInside) setIsDropdownOpen(false)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [dropdownMenuRef.current])

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          layout
          key={`header-type-${itemType}`}
          className="flex cursor-pointer"
          ref={dropdownSelectRef}
          onClick={toggleDropdown}
          whileHover={{ scale: isDropdownOpen ? 1 : 1.02 }}
          variants={itemTypeMotion}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="text-6xl font-bold">{`${capitalizeString(
            itemType
          )}s`}</div>
          <div className="mx-2 mt-7">
            <motion.div
              layout
              animate={{
                rotate: isDropdownOpen ? 180 : 0,
                transition: { duration: 0.2, type: "tween" },
              }}
            >
              <ArrowIcon />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="relative" ref={dropdownMenuRef}>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute top-14 right-1 z-20 mt-2 w-48 origin-top-right rounded-xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              tabIndex={-1}
              variants={itemTypeMenuMotion}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div role="none">
                <button
                  className="block w-full rounded-t-xl border-b border-gray-200 px-4 py-2 text-center text-xl font-bold text-gray-700 hover:bg-gray-200"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                  onClick={() => {
                    closeEditMode()
                    handleTypeChange(typeOptions[0])
                    setIsDropdownOpen(false)
                  }}
                >
                  {capitalizeString(typeOptions[0])}
                </button>
                <button
                  className="block w-full rounded-b-xl px-4 py-2 text-center text-xl font-bold text-gray-700 hover:bg-gray-200"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                  onClick={() => {
                    closeEditMode()
                    handleTypeChange(typeOptions[1])
                    toggleDropdown()
                  }}
                >
                  {capitalizeString(typeOptions[1].toLocaleLowerCase())}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
