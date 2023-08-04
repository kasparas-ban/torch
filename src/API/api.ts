import { useQuery } from "@tanstack/react-query"
import { dreamsData, goalsData, tasksData } from "../data/data"
import { groupItemsByParent } from "./helpers"
import { GeneralItem, ItemType } from "../types"
import { FocusType } from "../components/Timer/useTimerForm"

export const useItemsList = (itemType: ItemType) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [
      itemType === "TASK" ? "tasks" : itemType === "GOAL" ? "goals" : "dreams",
    ],
    queryFn: async () => {
      const items = await new Promise<GeneralItem[]>(resolve =>
        resolve(
          itemType === "TASK"
            ? tasksData
            : itemType === "GOAL"
            ? goalsData
            : dreamsData
        )
      )
      const groupedItems = groupItemsByParent(items, itemType)
      return groupedItems
    },
  })

  return { isLoading, error, data }
}

export const getItemsByType = async (input: string, focusType: FocusType) => {
  const items = await new Promise<GeneralItem[]>(resolve =>
    resolve(
      focusType === "TASKS"
        ? tasksData
        : focusType === "GOALS"
        ? goalsData
        : focusType === "DREAMS"
        ? dreamsData
        : [...tasksData, ...goalsData, ...dreamsData]
    )
  )

  const filteredItems = items
    .filter(item => item.title.toLowerCase().includes(input.toLowerCase()))
    .map(item => ({ label: item.title, value: item.id }))
  return filteredItems
}
