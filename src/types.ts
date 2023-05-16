export interface Task {
  taskId: number
  title: string
  progress: number
  duration: { hours: number | null; minutes: number | null }
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  recurring?: boolean
  goal?: any | null
}

export interface Goal {
  goalId: number
  title: string
  progress: number
  tasks: Task[]
  dream?: Dream
  targetDate?: Date | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

export interface Dream {
  dreamId: number
  title: string
  progress: number
  goals: Goal[]
}

export type ItemTypeLabel = "Tasks" | "Goals" | "Dreams"

export type ItemType = "TASK" | "GOAL" | "DREAM"

export type GeneralItem = Task | Goal | Dream
