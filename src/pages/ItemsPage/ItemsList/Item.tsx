import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ItemSublist from "./ItemSublist"
import { ItemStrip, RecurringItemStrip } from "./ItemStrip"
import useEditItem from "../useEditItem"
import ItemEditPanel from "./ItemEditPanel"
import { GeneralItem, ItemType, Task } from "../../../types"

export default function Item<T extends GeneralItem>({
  item,
  itemType,
}: {
  item: T
  itemType: ItemType
}) {
  const { editItem, setEditItem } = useEditItem()
  const [showSublist, setShowSublist] = useState(true)

  const itemSublist =
    item.type === "GOAL"
      ? item.tasks
      : item.type === "DREAM"
      ? item.goals
      : undefined
  const containsSublist = !!itemSublist?.length

  const toggleSublist = () => setShowSublist(prev => !prev)

  const showEditPanel = editItem?.type === item.type && editItem?.id === item.id

  const toggleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setEditItem(showEditPanel ? undefined : item)
  }

  const recurringInfo = itemType === "TASK" && (item as Task).recurring

  return (
    <motion.li layout>
      {recurringInfo ? (
        <RecurringItemStrip
          item={item as Task}
          showEditPanel={showEditPanel}
          toggleEditClick={toggleEditClick}
        />
      ) : (
        <ItemStrip
          item={item}
          itemType={itemType}
          toggleSublist={toggleSublist}
          itemSublist={itemSublist}
          showEditPanel={showEditPanel}
          toggleEditClick={toggleEditClick}
        />
      )}
      {showSublist ? (
        <>
          <AnimatePresence initial={false}>
            {showEditPanel && (
              <ItemEditPanel<T>
                key={`${itemType}_${item.id}_edit_panel`}
                item={item}
                sublistVisible={showSublist && showEditPanel}
                showAddTask={itemType === "GOAL"}
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
                key={`${itemType}_${item.id}_edit_panel`}
                item={item}
                sublistVisible={showSublist && showEditPanel}
                showAddTask={itemType === "GOAL"}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </motion.li>
  )
}
