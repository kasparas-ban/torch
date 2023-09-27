import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ItemResponse, formatItemResponse } from "./helpers"
import useListStore from "@/pages/ItemsPage/useListStore"
import useStorage from "@/pages/ItemsPage/useStorageStore"
import { FormattedItems } from "../types"
import {
  CustomError,
  ItemLoadServerErrorMsg,
  ItemLoadFetchErrorMsg,
  ItemLoadNotSignedInErrorMsg,
  PostFetchErrorMsg,
} from "./errorMsgs"
import {
  NewDreamType,
  NewGoalType,
  NewTaskType,
} from "@/components/Modals/schemas"
import { HOST, queryClient } from "./apiConfig"

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
              if (!res.ok) throw new CustomError("", PostFetchErrorMsg)
              return res.json() as Promise<ItemResponse>
            })
            .catch(err => {
              throw new CustomError(err, PostFetchErrorMsg)
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
