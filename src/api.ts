import { useQuery } from "@tanstack/react-query"
import { GeneralItem, ItemType } from "./types"
import { dreamsData, goalsData, tasksData } from "./data/data"

export const useItems = (itemType: ItemType) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [
      itemType === "TASK" ? "tasks" : itemType === "GOAL" ? "goals" : "dreams",
    ],
    queryFn: () =>
      new Promise<GeneralItem[]>(resolve =>
        resolve(
          itemType === "TASK"
            ? tasksData
            : itemType === "GOAL"
            ? goalsData
            : dreamsData
        )
      ),
  })

  return { isLoading, error, data }
}
