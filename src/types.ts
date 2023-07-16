export type GeneralItem = Task | Goal | Dream

export type Task = {
  id: number
  title: string
  progress: number
  type: 'TASK'
  duration: { hours: number | null; minutes: number | null }
  priority?: "LOW" | "MEDIUM" | "HIGH"
  targetDate?: Date | null
  recurring?: boolean
  goal?: Goal | null
}

export type Goal = {
  id: number
  title: string
  progress: number
  type: 'GOAL'
  tasks: Task[]
  dream?: Dream
  targetDate?: Date | null
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

export type Dream = {
  id: number
  title: string
  progress: number
  type: 'DREAM'
  goals: Goal[]
  targetDate?: Date | null
}

export type ItemTypeLabel = "Tasks" | "Goals" | "Dreams"

export type ItemType = "TASK" | "GOAL" | "DREAM"

export type OptionType = { value: number; label: string }

export type TimerAction = "start" | "pause" | "reset" | "tick"

export type TimerState = "idle" | "paused" | "running"
