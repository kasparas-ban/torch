export interface Task {
  taskId: number
  title: string
}

export interface Goal {
  goalId: number
  title: string
  tasks: Task[]
}

export type ItemType = "TASKS" | "GOALS" | "DREAMS"
