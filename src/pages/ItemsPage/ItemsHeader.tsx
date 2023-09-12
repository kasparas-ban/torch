import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from "react-responsive"
import useEditItem from "./useEditItem"
import useListStore from "./useListStore"
import useStorage from "./useStorageStore"
import { capitalizeString } from "../../helpers"
import { ItemType, ItemTypeLabel } from "../../types"
import useModal from "../../components/Modals/useModal"
import { GeneralModal } from "@/components/Modals/GeneralModal/GeneralModal"
import { ReactComponent as FilterIcon } from "../../assets/filter.svg"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"
import { ReactComponent as CloseIcon } from "../../assets/close.svg"

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
        <div className="ml-auto mt-7 flex space-x-4">
          <motion.button layout whileHover={{ scale: 1.2 }}>
            <FilterIcon className="cursor-pointer" />
          </motion.button>
          <GeneralModal>
            <motion.div layout whileHover={{ scale: 1.2 }}>
              <PlusIcon
                className="cursor-pointer"
                onClick={() => openGeneralModal()}
              />
            </motion.div>
          </GeneralModal>
        </div>
      </div>
      <StorageInfo />
    </>
  )
}

function StorageInfo() {
  const { isStorageUsed } = useStorage()
  const [showInfoPanel, setShowInfoPanel] = useState<boolean | undefined>(
    undefined,
  )
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  useEffect(() => {
    setShowInfoPanel(isDesktop ? false : isStorageUsed)
  }, [isStorageUsed])

  return isStorageUsed && showInfoPanel !== undefined ? (
    <div className="mb-8 mt-2">
      <AnimatePresence mode="popLayout">
        {showInfoPanel ? (
          <motion.div
            className="flex gap-2 rounded-xl bg-gradient-to-tl from-rose-400 to-red-400 px-4 py-2 text-white"
            initial={{ opacity: 0, marginTop: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, marginTop: 0 }}
          >
            <div className="flex w-full flex-col text-sm">
              <div>Reading data from your local storage.</div>
              <div className="text-md text-base font-medium">
                <span className="mr-1">Sign-in</span>
                to save your progress online!
              </div>
            </div>
            <div className="flex items-center">
              <CloseIcon
                className="w-5 cursor-pointer text-rose-200"
                onClick={() => setShowInfoPanel(false)}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div className="flex cursor-default">
            <div className="ml-auto rounded-lg bg-gradient-to-tl from-red-400 to-rose-400 px-3 pb-1 pt-0.5 text-xs uppercase text-white">
              Using local storage
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : null
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
