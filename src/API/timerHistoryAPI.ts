import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { TimerHistoryResponse, formatTimerHistory } from "./helpers"
import useListStore from "@/pages/ItemsPage/useListStore"
import { HOST, queryClient } from "./apiConfig"
import { TimerHistoryRecord } from "@/types"
import {
  CustomError,
  ItemLoadFetchErrorMsg,
  ItemLoadNotSignedInErrorMsg,
  ItemLoadServerErrorMsg,
  PostFetchErrorMsg,
} from "./errorMsgs"

type TimerRecordReq = {
  startTime: string
  endTime: string
  itemID?: number
}

export const useTimerHistory = () => {
  const { getToken } = useAuth()
  const { items } = useListStore()

  const { isLoading, error, data } = useQuery({
    queryKey: ["timer-history"],
    queryFn: async () => {
      let records = [] as TimerHistoryRecord[]
      const token = await getToken()

      if (token) {
        const response = await fetch(`${HOST}/api/timer-history`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => {
            if (!res.ok) throw new CustomError("", ItemLoadServerErrorMsg)
            return res.json()
          })
          .then((data: TimerHistoryResponse[] | null) => {
            if (!data) return []

            const formattedRecords = formatTimerHistory(data, items)
            return formattedRecords
          })
          .catch(err => {
            throw new CustomError(err, ItemLoadFetchErrorMsg)
          })
        records = response
      } else {
        throw new CustomError("", ItemLoadNotSignedInErrorMsg)
      }

      return records
    },
  })

  return { isLoading, error, data }
}

export const useAddTimerRecord = () => {
  const { getToken } = useAuth()

  const { data, mutate, isLoading, isError, isSuccess, mutateAsync, reset } =
    useMutation({
      mutationFn: async (timerRecord: TimerRecordReq) => {
        const token = await getToken()
        if (token) {
          return fetch(`${HOST}/api/add-timer-record`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: JSON.stringify(timerRecord),
          })
            .then(res => {
              if (!res.ok) throw new CustomError("", PostFetchErrorMsg)
              return res.json()
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
        queryClient.invalidateQueries({ queryKey: ["timer-history"] })
      },
    })

  return { isLoading, isError, isSuccess, data, mutate, mutateAsync, reset }
}
