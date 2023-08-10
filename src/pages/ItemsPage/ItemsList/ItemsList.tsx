import { useEffect } from "react"
import { motion, stagger, useAnimate } from "framer-motion"
import { GeneralItem, GroupedItems, ItemType } from "../../../types"
import useModal from "../../../components/Modals/useModal"
import Item from "./Item"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"

export default function ItemsList<T extends GeneralItem>({
  groupedItems,
  itemType,
}: {
  groupedItems?: GroupedItems<T>
  itemType: ItemType
}) {
  const { openTaskModal, openGoalModal, openDreamModal } = useModal()
  const [total_scope, animate] = useAnimate()

  useEffect(() => {
    if (!total_scope.current) return
    animate(
      "ul",
      { y: [-40, 0], opacity: [0, 1] },
      {
        duration: 0.3,
        type: "spring",
        bounce: 0.4,
        delay: stagger(0.025),
      },
    )
    animate(
      "li",
      { y: [-40, 0], opacity: [0, 1] },
      {
        duration: 0.3,
        type: "spring",
        bounce: 0.4,
        delay: stagger(0.025),
      },
    )
  }, [itemType, groupedItems])

  const handleAddItem = () =>
    itemType === "TASK"
      ? openTaskModal()
      : itemType === "GOAL"
      ? openGoalModal()
      : openDreamModal()

  return (
    <>
      {groupedItems && Object.keys(groupedItems) ? (
        <motion.ul
          ref={total_scope}
          key={`list_${itemType}`}
          className="space-y-3"
        >
          {Object.keys(groupedItems).map(group => {
            const parentLabel = groupedItems[group].parentLabel
            const items = groupedItems[group].items

            return (
              <motion.li key={`group_${group}`}>
                {parentLabel && (
                  <motion.div layout className="mb-2 text-gray-500">
                    {parentLabel}
                  </motion.div>
                )}
                {items?.length && (
                  <motion.ul className="space-y-3">
                    {items.map(item => (
                      <Item<T>
                        key={`${group}_${itemType}_${item.id}`}
                        item={item}
                        itemType={itemType}
                      />
                    ))}
                  </motion.ul>
                )}
              </motion.li>
            )
          })}
        </motion.ul>
      ) : (
        <motion.div layout className="mt-6 text-center">
          <div>No {itemType.toLowerCase()}s have been added.</div>
          <button className="mt-8 font-bold" onClick={handleAddItem}>
            <motion.div className="flex" whileHover={{ scale: 1.05 }}>
              <PlusSmallIcon />
              Add new{" "}
              {itemType === "TASK"
                ? "task"
                : itemType === "GOAL"
                ? "goal"
                : "dream"}
            </motion.div>
          </button>
        </motion.div>
      )}
    </>
  )
}
