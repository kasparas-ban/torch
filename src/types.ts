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
