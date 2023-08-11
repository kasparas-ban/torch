import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import ItemSublist from "./ItemSublist"
import ItemProgress from "./ProgressBar"
import useEditItem from "../useEditItem"
import { ROUTES } from "../../../routes"
import ItemEditPanel from "./ItemEditPanel"
import { GeneralItem, ItemType } from "../../../types"
import useTimerForm from "../../../components/Timer/useTimerForm"
import { ReactComponent as DotsIcon } from "../../../assets/dots.svg"
import { ReactComponent as TimerStartIcon } from "../../../assets/timer_start.svg"

export default function Item<T extends GeneralItem>({
  item,
  itemType,
}: {
  item: T
  itemType: ItemType
}) {
  const { editItem, setEditItem } = useEditItem()
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

  const showEditPanel = editItem?.type === item.type && editItem?.id === item.id

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
        onClick={() => !editItem && setShowSublist(prev => !prev)}
        className={clsx("relative flex", containsSublist && "mb-3")}
        style={{ zIndex: itemSublist?.length }}
        whileTap={{ scale: showEditPanel ? 1 : 0.98 }}
      >
        <motion.div
          layout
          className={clsx(
            "relative border border-gray-700 flex w-full cursor-pointer items-center overflow-hidden rounded-2xl pl-6 pr-1 md:rounded-3xl",
            editItem
              ? showEditPanel
                ? "bg-red-300"
                : "bg-gray-300"
              : "bg-red-300",
          )}
        >
          <ItemProgress
            progress={item.progress || 0}
            showEditPanel={showEditPanel}
          />
          <motion.div className="z-10 select-none py-3 truncate">
            {item.title}
          </motion.div>
          <div
            className={clsx(
              "rounded-full z-0 ml-auto h-10 w-10 flex shrink-0 items-center justify-center group",
              !editItem
                ? "hover:bg-red-200"
                : showEditPanel
                ? "hover:bg-red-200"
                : "hover:bg-gray-100",
            )}
            onClick={toggleEditClick}
          >
            <motion.div
              layout
              className="text-gray-600 group-hover:text-gray-800"
            >
              <DotsIcon />
            </motion.div>
          </div>
        </motion.div>
        <AnimatePresence>
          {showEditPanel && (
            <motion.div
              className="my-auto aspect-square w-12 ml-3 cursor-pointer rounded-full bg-red-400"
              whileHover={{ scale: 1.1 }}
              onClick={handleTimerClick}
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: 48, opacity: 1, marginLeft: 12 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            >
              <TimerStartIcon className="m-auto h-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {showSublist ? (
        <>
          <AnimatePresence initial={false}>
            {showEditPanel && (
              <ItemEditPanel<T>
                key={`goal_${item.id}_edit_panel`}
                item={item}
                sublistVisible={showSublist && showEditPanel}
              />
            )}
          </AnimatePresence>
          {containsSublist && (
            <ItemSublist<(typeof itemSublist)[number]>
              key={`${itemType}_${item.id}_sublist`}
              subitems={itemSublist || []}
              subitemType={itemType === "DREAM" ? "GOAL" : "TASK"}
              showSublist={showSublist}
              isParentEditActive={showEditPanel}
            />
          )}
        </>
      ) : (
        <>
          {containsSublist && (
            <ItemSublist<(typeof itemSublist)[number]>
              key={`${itemType}_${item.id}_sublist`}
              subitems={itemSublist || []}
              subitemType={itemType === "DREAM" ? "GOAL" : "TASK"}
              showSublist={showSublist}
              isParentEditActive={showEditPanel}
            />
          )}
          <AnimatePresence initial={false}>
            {showEditPanel && (
              <ItemEditPanel<T>
                key={`goal_${item.id}_edit_panel`}
                item={item}
                sublistVisible={showSublist && showEditPanel}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </motion.li>
  )
}
