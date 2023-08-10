import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import ItemSublist from "./ItemSublist"
import ItemProgress from "./ProgressBar"
import useEditMode from "../useEditMode"
import { ROUTES } from "../../../routes"
import ItemEditPanel from "./ItemEditPanel"
import { GeneralItem, ItemType } from "../../../types"
import useTimerForm from "../../../components/Timer/useTimerForm"
import { ReactComponent as TimerStartIcon } from "../../../assets/timer_start.svg"
import { ReactComponent as DotsIcon } from "../../../assets/dots.svg"

export default function Item<T extends GeneralItem>({
  item,
  itemType,
}: {
  item: T
  itemType: ItemType
}) {
  const { editMode, editItem, setEditItem } = useEditMode()
  const [showSublist, setShowSublist] = useState(true)

  const navigate = useNavigate()
  const { setFocusOn, setFocusType } = useTimerForm()

  const itemSublist =
    item.type === "GOAL"
      ? item.tasks
      : item.type === "DREAM"
      ? item.goals
      : undefined
  const containsSublist = !!itemSublist?.length

  const showEditPanel =
    editMode && editItem?.type === item.type && editItem?.id === item.id

  const toggleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setEditItem(showEditPanel ? undefined : item)
  }

  const handleTimerClick = () => {
    navigate(ROUTES.index.path)
    setFocusOn({ value: item.id, label: item.title, progress: item.progress })
    setFocusType(
      itemType === "TASK"
        ? "TASKS"
        : itemType === "GOAL"
        ? "GOALS"
        : itemType === "DREAM"
        ? "DREAMS"
        : "ALL",
    )
  }

  return (
    <motion.li layout>
      <motion.div
        layout
        onClick={() => setShowSublist(prev => !prev)}
        className="relative flex space-x-3 mb-2"
        style={{ zIndex: itemSublist?.length }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          layout
          className={`relative border border-gray-700 flex w-full cursor-pointer items-center overflow-hidden rounded-2xl h-12 pl-6 pr-1 md:rounded-3xl ${
            editMode && !showEditPanel ? "bg-gray-300" : "bg-red-300"
          }`}
        >
          <ItemProgress
            progress={item.progress || 0}
            inEditMode={editMode && !showEditPanel}
          />
          <motion.div className="z-10 select-none">{item.title}</motion.div>
          <div className="hover:bg-red-200 rounded-full ml-auto h-10 w-10 flex items-center justify-center group">
            <motion.div
              layout
              className="text-gray-600 group-hover:text-gray-800"
            >
              <DotsIcon />
            </motion.div>
          </div>
        </motion.div>
        {!containsSublist && !editMode && (
          <motion.div
            className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400"
            whileHover={{ scale: 1.1 }}
            onClick={handleTimerClick}
          >
            <TimerStartIcon className="m-auto h-full" />
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence initial={false}>
        {showEditPanel && (
          <ItemEditPanel<T> key={`goal_${item.id}_edit_panel`} item={item} />
        )}
      </AnimatePresence>
      {containsSublist && (
        <ItemSublist<(typeof itemSublist)[number]>
          key={`${itemType}_${item.id}_sublist`}
          subitems={itemSublist || []}
          subitemType={itemType === "DREAM" ? "GOAL" : "TASK"}
          editMode={editMode}
          editItem={editItem as (typeof itemSublist)[number] | undefined}
          setEditItem={
            setEditItem as React.Dispatch<
              React.SetStateAction<(typeof itemSublist)[number] | undefined>
            >
          }
          showSublist={showSublist}
        />
      )}
    </motion.li>
  )
}
