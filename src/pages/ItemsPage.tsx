import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AddNewModals, ModalState } from "../components/AddNewModals"
import { ReactComponent as FilterIcon } from "../assets/filter.svg"
import { ReactComponent as PlusIcon } from "../assets/plus.svg"
import { ReactComponent as ArrowIcon } from "../assets/arrow.svg"
import { ReactComponent as TimerStartIcon } from "../assets/timer_start.svg"
import { ReactComponent as PlusSmallIcon } from "../assets/plus_small.svg"
import { capitalizeString } from "../helpers"

interface Task {
  title: string
}

interface Goal {
  title: string
  tasks: Task[]
}

type ItemType = "TASKS" | "GOALS" | "DREAMS"

const goals: Goal[] = [
  {
    title: "Make a todo app",
    tasks: [
      {
        title: "Make a Figma sketch",
      },
      {
        title: "Learn Next.js",
      },
      {
        title: "Make a timer app",
      },
    ],
  },
  {
    title: "Learn to play chess",
    tasks: [
      {
        title: "Learn chess rules",
      },
      {
        title: "Learn opening moves",
      },
      {
        title: "Play a match with dad",
      },
    ],
  },
  {
    title: 'Finish "The Shape of Space"',
    tasks: [],
  },
]

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

const itemMotion = {
  initial: { x: -40, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeInOut", duration: 0.2 },
  },
}

function ItemsPage() {
  const [modal, setModal] = useState<ModalState>({
    showBackground: false,
    isAddTaskModalOpen: false,
  })

  const [itemType, setItemType] = useState<ItemType>("GOALS")
  const items = itemType === "TASKS" ? [] : itemType === "GOALS" ? goals : []

  const openGeneralModal = () =>
    setModal({ showBackground: true, isGeneralModalOpen: true })

  return (
    <div className="mt-4 flex justify-between max-[768px]:px-6 md:justify-center md:space-x-36">
      <div className="w-[650px]">
        <ItemsHeader
          openGeneralModal={openGeneralModal}
          itemType={itemType}
          setItemType={setItemType}
        />
        <ItemsList items={items} itemType={itemType} />
        <AddNewModals modal={modal} setModal={setModal} />
      </div>
    </div>
  )
}

function ItemsHeader({
  openGeneralModal,
  itemType,
  setItemType,
}: {
  openGeneralModal: () => void
  itemType: ItemType
  setItemType: (type: ItemType) => void
}) {
  return (
    <div className="mb-8 flex">
      <ItemsTypeDropdown itemType={itemType} setItemType={setItemType} />
      <div className="mt-7 ml-auto flex space-x-4">
        <motion.div layout whileHover={{ scale: 1.2 }}>
          <FilterIcon className="cursor-pointer" />
        </motion.div>
        <motion.div layout whileHover={{ scale: 1.2 }}>
          <PlusIcon className="cursor-pointer" onClick={openGeneralModal} />
        </motion.div>
      </div>
    </div>
  )
}

function ItemsTypeDropdown({
  itemType,
  setItemType,
}: {
  itemType: ItemType
  setItemType: (type: ItemType) => void
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownSelectRef = useRef<HTMLDivElement | null>(null)
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null)
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev)

  const typeOptions = ["TASKS", "GOALS", "DREAMS"].filter(
    type => type !== itemType
  ) as ItemType[]

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
          <div className="text-6xl font-bold">{capitalizeString(itemType)}</div>
          <motion.div layout>
            <ArrowIcon className="mx-2 mt-7" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="relative" ref={dropdownMenuRef}>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              className="absolute top-14 right-1 z-50 mt-2 w-48 origin-top-right rounded-xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                    setItemType(typeOptions[0])
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
                    setItemType(typeOptions[1])
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

function ItemsList({ items, itemType }: { items: Goal[]; itemType: ItemType }) {
  return (
    <>
      {items.length ? (
        <motion.ul
          className="space-y-3"
          variants={itemMotion}
          initial="initial"
          animate="animate"
        >
          {items.map((item, idx) => (
            <Item item={item} key={idx} />
          ))}
        </motion.ul>
      ) : (
        <div className="mt-6 text-center">
          <div>No {itemType.toLowerCase()} have been added.</div>
          <button className="mt-8 font-bold">
            <motion.div layout className="flex" whileHover={{ scale: 1.05 }}>
              <PlusSmallIcon />
              Add new{" "}
              {itemType === "TASKS"
                ? "task"
                : itemType === "GOALS"
                ? "goal"
                : "dream"}
            </motion.div>
          </button>
        </div>
      )}
    </>
  )
}

function Item({ item }: { item: Goal }) {
  const [showSublist, setShowSublist] = useState(true)
  const containsSublist = !!item.tasks.length

  return (
    <motion.li variants={itemMotion}>
      <div
        onClick={() => setShowSublist(prev => !prev)}
        className="flex space-x-3"
      >
        <div className="flex w-full cursor-pointer rounded-full bg-red-400 py-3 px-6">
          <div>{item.title}</div>
          {containsSublist && (
            <ArrowIcon
              className={`ml-auto ${showSublist ? "rotate-180" : ""}`}
            />
          )}
        </div>
        {!containsSublist && (
          <div className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400">
            <TimerStartIcon className="m-auto h-full" />
          </div>
        )}
      </div>
      {showSublist && <ItemSublist tasks={item.tasks} />}
    </motion.li>
  )
}

function ItemSublist({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      <ul className="mt-3 ml-6 space-y-3">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex space-x-3">
            <div className="my-auto aspect-square w-4 rounded-full bg-gray-500"></div>
            <div className="flex w-full cursor-pointer rounded-full bg-red-400 py-3 px-6">
              <div>{task.title}</div>
            </div>
            <div className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400">
              <TimerStartIcon className="m-auto h-full" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemsPage
