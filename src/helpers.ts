import { StoreApi, UseBoundStore } from "zustand"
import { Time } from "@internationalized/date"

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store(s => s[k as keyof typeof s])
  }

  return store
}

export const pruneObject = <T extends Object>(obj: T) => {
  const deepCopy = structuredClone(obj)
  Object.keys(deepCopy).forEach(
    (key: string) =>
      !deepCopy[key as keyof T] && delete deepCopy[key as keyof T],
  )
  return deepCopy
}

export const capitalizeString = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

export const secondsToMinutes = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}

export const toPercent = (input?: number) => {
  if (input === undefined) return ""

  const percent = input * 100
  const rounded = Math.round(input * 100)

  if (percent !== 0 && rounded === 0) return "<0%"
  if (percent !== 100 && rounded === 100) return "99%"

  return `${rounded.toString()}%`
}

export const getTime = (seconds?: number) => {
  if (!seconds) return new Time(0)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return new Time(hours, minutes)
}

export const formatTimeSpent = (totalSeconds: number) => {
  if (totalSeconds === 0) return "0 h"

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours && minutes) return `${hours} h ${minutes} min`
  if (hours) return `${hours} h`
  if (minutes) return `${minutes} min`
  if (seconds) return `${seconds} sec`
  return "0 h"
}

export const formatPercentages = (fraction?: number) => {
  if (fraction === undefined) return "-"
  const rounded = Math.round(fraction * 100 * 10) / 10

  if (rounded === 0 && fraction !== 0) return "<0.1"
  if (rounded === 100 && fraction !== 1) return ">99"

  return `${rounded}`
}

export const getAllCountries = (lang = "en") => {
  const A = 65
  const Z = 90
  const countryName = new Intl.DisplayNames([lang], { type: "region" })
  const countries: { [key: string]: string | undefined } = {}
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j)
      let name = countryName.of(code)
      if (code !== name) {
        countries[code] = name
      }
    }
  }

  const countryOptions = Object.entries(countries)
    .filter(([_, value]) => !!value)
    .map(([key, value]) => ({ label: value as string, value: key }))
  return countryOptions
}
