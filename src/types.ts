export interface Task {
  title: string
}

export interface Goal {
  id: number
  title: string
  tasks: Task[]
}

export type ItemType = "TASKS" | "GOALS" | "DREAMS"
