import React, { useEffect, useState } from "react"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"
import { ItemStrip, RecurringItemStrip } from "./ItemStrip"
import { GeneralItem, ItemType, Task } from "../../../types"
import ItemEditPanel from "./ItemEditPanel"
import useListStore from "../useListStore"
import useEditItem from "../useEditItem"
import ItemSublist from "./ItemSublist"

export default function Item<T extends GeneralItem>({
  idx,
  item,
  itemType,
}: {
  idx: number
  item: T
  itemType: ItemType
}) {
  const { isItemCollapsed, saveCollapseState } = useListStore()
  const { editItem, setEditItem } = useEditItem()
  const [showSublist, setShowSublist] = useState(!isItemCollapsed(item))

  const [item_scope, animate] = useAnimate()

  useEffect(() => {
    if (!item_scope.current) return
    animate(
      item_scope.current,
      {
        y: [-40, 0],
        opacity: [0, 1],
      },
      {
        duration: 1,
        type: "spring",
        bounce: 0.4,
        delay: 0.05 * idx,
      },
    )
    showSublist &&
      containsSublist &&
      animate(
        "li",
        {
          y: [-40, 0],
          opacity: [0, 1],
        },
        {
          duration: 1,
          type: "spring",
          bounce: 0.4,
          delay: stagger(0.025),
        },
      )
  }, [])

  const itemSublist =
    item.type === "GOAL"
      ? item.tasks
      : item.type === "DREAM"
      ? item.goals
      : undefined
  const containsSublist = !!itemSublist?.length

  const toggleSublist = () => {
    const newState = !showSublist
    setShowSublist(newState)
    saveCollapseState({ itemId: item.id, itemType: item.type }, !newState)
  }

  const showEditPanel = editItem?.type === item.type && editItem?.id === item.id

  const toggleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setEditItem(showEditPanel ? undefined : item)
  }

  const recurringInfo = itemType === "TASK" && (item as Task).recurring

  return (
    <motion.li
      layout
      ref={item_scope}
      id={`li_${item.id}${showSublist ? "" : "_COLLAPSED"}`}
    >
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
