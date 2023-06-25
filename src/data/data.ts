import { Goal, Task } from "../types"

export const goalsData: Goal[] = [
  {
    goalId: 1,
    title: "Make a todo/timer app",
    progress: 0.3,
    targetDate: new Date("2023-09-01"),
    priority: "HIGH",
    tasks: [
      {
        taskId: 100,
        title: "Make a Figma sketch",
        progress: 0.2,
        duration: { hours: 2, minutes: 0 },
        priority: "HIGH",
      },
      {
        taskId: 200,
        title: "Learn Next.js",
        progress: 0.3,
        duration: { hours: 2, minutes: 0 },
        priority: "LOW",
      },
      {
        taskId: 300,
        title: "Code frontend",
        progress: 0.4,
        duration: { hours: 2, minutes: 0 },
        targetDate: new Date("2023-08-01"),
        priority: "HIGH",
      },
    ],
  },
  {
    goalId: 2,
    title: "Learn to play chess",
    progress: 0.67,
    priority: "LOW",
    tasks: [
      {
        taskId: 400,
        title: "Learn chess rules",
        progress: 0.54,
        duration: { hours: 2, minutes: 0 },
      },
      {
        taskId: 500,
        title: "Learn opening moves",
        progress: 0.89,
        duration: { hours: 2, minutes: 0 },
      },
      {
        taskId: 600,
        title: "Play a match with someone",
        progress: 0.61,
        duration: { hours: 2, minutes: 0 },
        recurring: true,
      },
    ],
  },
  {
    goalId: 3,
    title: 'Finish "The Shape of Space"',
    progress: 0.94,
    tasks: [],
    priority: "MEDIUM",
  },
]

export const tasksData = goalsData.reduce((list, goal) => {
  return [...list, ...goal.tasks]
}, [] as Task[])

export const dreamsData = []
