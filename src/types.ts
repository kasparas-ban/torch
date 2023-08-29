export type GeneralItem = Task | Goal | Dream

export type GroupedItems<T> = {
  [parentId: number | string | "empty" | "other"]: {
    parentLabel?: string
    items: T[]
  }
}

export type Task = {
  id: number
  title: string
  progress?: number
  type: "TASK"
  duration?: { hours: number | null; minutes: number | null }
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  recurring?: RecurringType
  goal?: Goal | null
}

export type Goal = {
  id: number
  title: string
  progress: number
  type: "GOAL"
  tasks?: Task[]
  dream?: Dream
  targetDate?: Date | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

export type Dream = {
  id: number
  title: string
  progress: number
  type: "DREAM"
  goals?: Goal[]
  targetDate?: Date | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

export type ItemTypeLabel = "Tasks" | "Goals" | "Dreams"

export type ItemType = "TASK" | "GOAL" | "DREAM"

export type OptionType = { value: number; label: string; progress?: number }

export type GroupedOptionType = {
  value: number
  label: string
  options: Array<OptionType & { parent?: number }>
}

export type TimerState = "idle" | "paused" | "running"

export type RecurringType = {
  times: number
  period: ReccuringPeriod
  progress?: number
}

export type ReccuringPeriod = "DAY" | "WEEK" | "MONTH"

export type TimerHistoryRecord = {
  timeSpent: { hours: number; minutes: number; seconds: number }
  focusOn?: { label: string; value: number; type: ItemType }
  progress: number
  difference?: number
  startTime: Date
  finishTime: Date
}

export type Profile = {
  username: string
  email: string
  birthday?: Date
  gender?: GenderOption
  joinedSince: Date
  country?: { label: string; value: string }
}

export type GenderOption =
  | { label: "Male"; value: "MALE" }
  | { label: "Female"; value: "FEMALE" }
