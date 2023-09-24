import { useAuth } from "@clerk/clerk-react"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { ItemResponse, formatItemResponse } from "./helpers"
import { timerHistoryData } from "@/data/timerHistory"
import useListStore from "@/pages/ItemsPage/useListStore"
import { FocusType } from "../components/Timer/hooks/useTimerForm"
import useStorage from "@/pages/ItemsPage/useStorageStore"
import { Dream, FormattedItems, Goal, Task, TimerHistoryRecord } from "../types"
import {
  CustomError,
  ItemLoadServerErrorMsg,
  ItemLoadFetchErrorMsg,
  ItemLoadNotSignedInErrorMsg,
  AddItemFetchErrorMsg,
} from "./errorMsgs"
import {
  NewDreamType,
  NewGoalType,
  NewTaskType,
} from "@/components/Modals/schemas"

if (!import.meta.env.VITE_HOST_ADDRESS) {
  throw new Error("Missing host address")
}
const HOST = import.meta.env.VITE_HOST_ADDRESS

export const queryClient = new QueryClient()

export const useItemsList = (enabled = true) => {
  const { getToken } = useAuth()
  const { setIsStorageUsed } = useStorage()
  const { setItems } = useListStore()

  const { isLoading, error, data } = useQuery<FormattedItems, CustomError>(
    ["items"],
    async () => {
      let items = { tasks: [], goals: [], dreams: [] } as FormattedItems
      const token = await getToken()

      if (token) {
        const response = await fetch(`${HOST}/api/items`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => {
            if (!res.ok) throw new CustomError("", ItemLoadServerErrorMsg)
            return res.json()
          })
          .then(data => {
            const formattedItems = formatItemResponse(data)
            setIsStorageUsed(false)
            setItems(formattedItems)
            return formattedItems
          })
          .catch(err => {
            setIsStorageUsed(true)
            throw new CustomError(err, ItemLoadFetchErrorMsg)
          })
        items = response
      } else {
        setIsStorageUsed(true)
        throw new CustomError("", ItemLoadNotSignedInErrorMsg)
      }

      return items
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled,
    },
  )
  return { isLoading, error, data }
}

export const useAddNewItem = () => {
  const { getToken } = useAuth()

  const { data, mutate, isLoading, isError, isSuccess, mutateAsync, reset } =
    useMutation({
      mutationFn: async (newItem: NewTaskType | NewGoalType | NewDreamType) => {
        const token = await getToken()
        if (token) {
          return fetch(`${HOST}/api/add-item`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(newItem),
          })
            .then(res => {
              if (!res.ok) throw new CustomError("", AddItemFetchErrorMsg)
              return res.json() as Promise<ItemResponse>
            })
            .catch(err => {
              throw new CustomError(err, AddItemFetchErrorMsg)
            })
        } else {
          // TODO: add to localStorage
        }
        return undefined
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["items"] })
      },
    })

  return { isLoading, isError, isSuccess, data, mutate, mutateAsync, reset }
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
      : [
          ...(itemData?.tasks || []),
          ...(itemData?.goals || []),
          ...(itemData?.dreams || []),
        ]

  const filteredItems =
    selectedItems?.map(item => ({
      label: item.title,
      value: item.id,
      type: item.type,
      progress: item.progress,
      timeSpent: item.timeSpent,
      totalTimeSpent: (item as Goal)?.totalTimeSpent,
      containsTasks:
        !!(item as Goal).tasks?.length ||
        !!(item as Dream).goals?.find(goal => !!goal.tasks?.length),
      duration:
        (item as Task)?.duration ||
        (item as Goal).tasks?.reduce(
          (prev, curr) => (prev += curr.duration || 0),
          0,
        ),
      parent: (item as Task).goal?.id || (item as Goal).dream?.id,
    })) || []

  if (grouped) {
    if (focusType === "ALL" || focusType === "DREAMS") return filteredItems

    const parents =
      focusType === "TASKS"
        ? (itemData?.goals || []).filter(goal =>
            filteredItems.find(item => item.parent === goal.id),
          )
        : (itemData?.dreams || []).filter(dream =>
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
