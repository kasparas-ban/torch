import { useQuery } from "@tanstack/react-query"
import { ItemResponse, formatItemResponse } from "./helpers"
import { timerHistoryData } from "@/data/timerHistory"
import { FocusType } from "../components/Timer/useTimerForm"
import { dreamsData, goalsData, tasksData } from "../data/itemData"
import { Dream, Goal, Task, TimerHistoryRecord } from "../types"
import { useAuth } from "@clerk/clerk-react"

if (!import.meta.env.VITE_HOST_ADDRESS) {
  throw new Error("Missing host address")
}
const HOST = import.meta.env.VITE_HOST_ADDRESS

export const useItemsList = () => {
  const { getToken, isSignedIn } = useAuth()

  const { isLoading, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const token = await getToken()
      const response = await fetch(`${HOST}/api/items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to get user tasks")
          }

          return res.json() as Promise<ItemResponse[]>
        })
        .catch(err => {
          console.error(err)
          return [] as ItemResponse[]
        })

      const formattedItems = formatItemResponse(response)
      return formattedItems
    },
    refetchOnWindowFocus: false,
  })

  return { isLoading, error, data }
}

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

export const getItemsByType = ({
  itemData,
  focusType,
  grouped,
}: {
  itemData?: { tasks: Task[]; goals: Goal[]; dreams: Dream[] }
  focusType: FocusType
  grouped?: boolean
}) => {
  const selectedItems =
    focusType === "TASKS"
      ? itemData?.tasks
      : focusType === "GOALS"
      ? itemData?.goals
      : focusType === "DREAMS"
      ? itemData?.dreams
      : [...tasksData, ...goalsData, ...dreamsData]

  const filteredItems =
    selectedItems?.map(item => ({
      label: item.title,
      value: item.id,
      type: item.type,
      progress: item.progress,
      timeSpent: item.timeSpent,
      duration: (item as Task)?.duration,
      parent: (item as Task).goal?.id || (item as Goal).dream?.id,
    })) || []

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
