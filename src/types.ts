import { Time } from "@internationalized/date"

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
  type: "TASK"
  priority?: "LOW" | "MEDIUM" | "HIGH"
  progress?: number
  duration?: number
  targetDate?: string | null
  recurring?: RecurringType
  timeSpent: number
  goal?: Goal | null
}

export type Goal = {
  id: number
  title: string
  progress: number
  type: "GOAL"
  tasks?: Task[]
  dream?: Dream
  targetDate?: string | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
  timeSpent: number
  totalTimeSpent: number
}

export type Dream = {
  id: number
  title: string
  progress: number
  type: "DREAM"
  goals?: Goal[]
  targetDate?: string | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
  timeSpent: number
  totalTimeSpent: number
}

export type FormattedItems = {
  tasks: Task[]
  goals: Goal[]
  dreams: Dream[]
}

export type ItemTypeLabel = "Tasks" | "Goals" | "Dreams"

export type ItemType = "TASK" | "GOAL" | "DREAM"

export type ItemOptionType = {
  value: number
  label: string
  type: ItemType
  progress?: number
  timeSpent?: number
  totalTimeSpent?: number
  duration?: number
}

export type GroupedOptionType = {
  value: number
  label: string
  options: Array<ItemOptionType & { parent?: number }>
}

export type TimerState = "idle" | "paused" | "running"

export type RecurringType = {
  times: number
  period: ReccuringPeriod
  progress?: number
}

export type ReccuringPeriod = "DAY" | "WEEK" | "MONTH"

export type TimerHistoryRecord = {
  timeSpent: Time
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
