import { useQuery } from "@tanstack/react-query"
import { Dream, GeneralItem, Goal, GroupedItems, ItemType, Task } from "./types"
import { dreamsData, goalsData, tasksData } from "./data/data"

export const useItems = (itemType: ItemType) => {
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
      let response = {} as
        | GroupedItems<Goal>
        | GroupedItems<Task>
        | GroupedItems<Dream>
      if (itemType === "GOAL") {
        const groupedItems = (items as Goal[]).reduce((prev, curr) => {
          const dreamTitle = curr.dream?.title || "Other"
          const groupLabel = curr.dream?.id || "other"
          const groupedGoals = prev[groupLabel]?.items || []

          return {
            ...prev,
            [groupLabel]: {
              parentLabel: dreamTitle,
              items: [...groupedGoals, curr],
            },
          }
        }, {} as GroupedItems<Goal>)

        response = groupedItems
      } else if (itemType === "TASK") {
        const groupedItems_1 = (items as Task[]).reduce((prev_1, curr_1) => {
          const goalTitle = curr_1.goal?.title || "Other"
          const groupLabel_1 = curr_1.goal?.id || "other"
          const groupedTasks = prev_1[groupLabel_1]?.items || []

          return {
            ...prev_1,
            [groupLabel_1]: {
              parentLabel: goalTitle,
              items: [...groupedTasks, curr_1],
            },
          }
        }, {} as GroupedItems<Task>)

        response = groupedItems_1
      } else if (itemType === "DREAM") {
        response = { empty: { items: items as Dream[] } }
      }
      return response
    },
  })

  return { isLoading, error, data }
}
