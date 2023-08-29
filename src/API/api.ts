import { useQuery } from "@tanstack/react-query"
import { groupItemsByParent } from "./helpers"
import { timerHistoryData } from "@/data/timerHistory"
import { FocusType } from "../components/Timer/useTimerForm"
import { dreamsData, goalsData, tasksData } from "../data/itemData"
import { GeneralItem, Goal, ItemType, Task, TimerHistoryRecord } from "../types"
import { Time } from "@internationalized/date"

export const useTimerHistory = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["timer-history"],
    queryFn: async () => {
      const items = await new Promise<TimerHistoryRecord[]>(resolve => {
        setTimeout(() => resolve(timerHistoryData), 200)
      })
      return items
    },
  })

  return { isLoading, error, data }
}

export const useItemsList = (itemType: ItemType) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [
      itemType === "TASK" ? "tasks" : itemType === "GOAL" ? "goals" : "dreams",
    ],
    queryFn: async () => {
      const items = await new Promise<GeneralItem[]>(resolve => {
        setTimeout(
          () =>
            resolve(
              itemType === "TASK"
                ? tasksData
                : itemType === "GOAL"
                ? goalsData
                : dreamsData,
            ),
          2000,
        )
      })
      const groupedItems = groupItemsByParent(items, itemType)
      return groupedItems
    },
  })

  return { isLoading, error, data }
}

export const getItemsByType = async (
  input: string,
  focusType: FocusType,
  grouped?: boolean,
) => {
  const items = await new Promise<GeneralItem[]>(resolve =>
    resolve(
      focusType === "TASKS"
        ? tasksData
        : focusType === "GOALS"
        ? goalsData
        : focusType === "DREAMS"
        ? dreamsData
        : [...tasksData, ...goalsData, ...dreamsData],
    ),
  )

  const filteredItems = filterItems(items, input)

  if (grouped) {
    if (focusType === "ALL" || focusType === "DREAMS") return filteredItems

    const parents =
      focusType === "TASKS"
        ? goalsData.filter(goal =>
            filteredItems.find(item => item.parent === goal.id),
          )
        : dreamsData.filter(dream =>
            filteredItems.find(item => item.parent === dream.id),
          )

    const groupedItems = parents.map(parent => ({
      label: parent.title,
      value: parent.id,
      options: filteredItems.filter(item => item.parent === parent.id),
    }))

    return groupedItems
  }

  return filteredItems
}

const filterItems = (items: GeneralItem[], input: string) =>
  items
    .filter(item => item.title.toLowerCase().includes(input.toLowerCase()))
    .map(item => ({
      label: item.title,
      value: item.id,
      progress: item.progress,
      timeSpent: item.timeSpent,
      timeLeft: (item as Goal).timeLeft,
      duration: new Time(
        (item as Task).duration?.hours || 0,
        (item as Task).duration?.minutes || 0,
      ),
      parent: (item as Task).goal?.id || (item as Goal).dream?.id,
    }))
