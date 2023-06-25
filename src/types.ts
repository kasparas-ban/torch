export type Item = {
  title: string
  progress: number
}

export type Task = Item & {
  taskId: number
  duration: { hours: number | null; minutes: number | null }
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  recurring?: boolean
  goal?: any | null
}

export type Goal = Item & {
  goalId: number
  tasks: Task[]
  dream?: Dream
  targetDate?: Date | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

export type Dream = Item & {
  dreamId: number
  goals: Goal[]
}

export type ItemTypeLabel = "Tasks" | "Goals" | "Dreams"

export type ItemType = "TASK" | "GOAL" | "DREAM"

export type GeneralItem = Task | Goal | Dream

export type OptionType = { value: number; label: string }
