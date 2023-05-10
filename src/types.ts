export interface Task {
  taskId: number
  title: string
  progress: number
}

export interface Goal {
  goalId: number
  title: string
  progress: number
  tasks: Task[]
}

export type ItemType = "TASKS" | "GOALS" | "DREAMS"
