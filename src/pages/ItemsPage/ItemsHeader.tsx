import { useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import useEditItem from "./useEditItem"
import useListStore from "./useListStore"
import { capitalizeString } from "../../helpers"
import { ItemType, ItemTypeLabel } from "../../types"
import useModal from "../../components/Modals/useModal"
import StorageInfo from "@/components/StorageInfo/StorageInfo"
import { GeneralModal } from "@/components/Modals/GeneralModal/GeneralModal"
import { ReactComponent as FilterIcon } from "../../assets/filter.svg"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"

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

export function ItemsHeader({ itemType }: { itemType: ItemType }) {
  const { openGeneralModal } = useModal()

  return (
    <>
      <div className="flex">
        <ItemsTypeDropdown itemType={itemType} />
        <div className="relative bottom-1 ml-auto mt-7 flex items-center space-x-4">
          {/* <motion.button layout className="cursor-default text-gray-400">
            <FilterIcon />
          </motion.button> */}
          <motion.div layout whileHover={{ scale: 1.2 }}>
            <PlusIcon
              className="cursor-pointer"
              onClick={() => openGeneralModal()}
            />
          </motion.div>
        </div>
      </div>
      <div className="mb-8 mt-2">
        <StorageInfo />
      </div>
    </>
  )
}

function ItemsTypeDropdown({ itemType }: { itemType: ItemType }) {
  const { setEditItem } = useEditItem()
  const { saveItemType } = useListStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownSelectRef = useRef<HTMLDivElement | null>(null)
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

  const selectedLabel =
    itemType === "TASK" ? "Tasks" : itemType === "GOAL" ? "Goals" : "Dreams"
  const typeOptions = ["Tasks", "Goals", "Dreams"].filter(
    type => type !== selectedLabel,
  ) as ItemTypeLabel[]

  const handleTypeChange = (type: ItemTypeLabel) => {
    const selectedType =
      type === "Tasks" ? "TASK" : type === "Goals" ? "GOAL" : "DREAM"
    saveItemType(selectedType)
    setEditItem(undefined)
  }

  useLayoutEffect(() => {
    if (!dropdownMenuRef.current) return

    const onClick = (event: Event) => {
      const clickInside =
        dropdownMenuRef.current?.contains(event.target as Node) ||
        dropdownSelectRef.current?.contains(event.target as Node)

      if (isDropdownOpen && !clickInside) setIsDropdownOpen(false)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [dropdownMenuRef.current, isDropdownOpen])

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
          <div className="flex items-center text-6xl font-bold">
            {`${capitalizeString(itemType)}s`}
          </div>
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
              className="absolute right-1 top-14 z-20 mt-2 w-48 origin-top-right rounded-xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
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
