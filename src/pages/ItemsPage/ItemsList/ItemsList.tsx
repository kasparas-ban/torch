import { motion } from "framer-motion"
import Item from "./Item"
import useModal from "../../../components/Modals/useModal"
import { GeneralItem, GroupedItems, ItemType } from "../../../types"
import { ReactComponent as PlusSmallIcon } from "../../../assets/plus_small.svg"

export default function ItemsList<T extends GeneralItem>({
  groupedItems,
  itemType,
}: {
  groupedItems?: GroupedItems<T>
  itemType: ItemType
}) {
  const { openTaskModal, openGoalModal, openDreamModal } = useModal()

  const handleAddItem = () =>
    itemType === "TASK"
      ? openTaskModal()
      : itemType === "GOAL"
      ? openGoalModal()
      : openDreamModal()

  let totalIndex = 0

  const isListEmpty = Object.values(groupedItems || {}).reduce(
    (prev, curr) => prev && !curr.items.length,
    true,
  )

  return (
    <>
      {groupedItems && !isListEmpty ? (
        <motion.ul key={`list_${itemType}`} className="space-y-3">
          {Object.keys(groupedItems).map((groupKey, groupIdx) => {
            const parentLabel = groupedItems[groupKey].parentLabel
            const items = groupedItems[groupKey].items

            if (groupIdx - 1 >= 0) {
              const prevKey = Object.keys(groupedItems)[groupIdx - 1]
              totalIndex += groupedItems[prevKey].items.length
            }

            return (
              <motion.li key={`group_${groupKey}`}>
                {parentLabel && (
                  <motion.div
                    layout
                    className="mb-2 font-medium text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {parentLabel}
                  </motion.div>
                )}
                {items?.length && (
                  <motion.ul className="space-y-3">
                    {items.map((item, itemIdx) => (
                      <Item<T>
                        idx={totalIndex + itemIdx}
                        key={`${groupKey}_${itemType}_${item.id}`}
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
