import { Dream, Goal, Task } from "../types"

const dreams = [
  {
    id: 1,
    title: "Learn Spanish",
    progress: 0.15,
    type: "DREAM",
    goals: [3, 4, 5, 6],
  },
  {
    id: 2,
    title: "Get fit",
    progress: 0.54,
    type: "DREAM",
    goals: [7],
    targetDate: new Date("2024-01-01"),
  },
  {
    id: 3,
    title: "Get good at math",
    progress: 0.08,
    type: "DREAM",
    goals: [8, 9],
  },
]

const goals = [
  {
    id: 1,
    title: "Make a todo/timer app",
    progress: 0.4,
    targetDate: new Date("2023-09-01"),
    priority: "HIGH",
    type: "GOAL",
    tasks: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 2,
    title: "Learn chess",
    progress: 0,
    priority: "LOW",
    type: "GOAL",
    tasks: [],
  },
  {
    id: 3,
    title: "Learn Spanish vocabulary",
    progress: 0.1,
    type: "GOAL",
    tasks: [9, 10, 11, 12],
  },
  {
    id: 4,
    title: "Learn Spanish grammar",
    progress: 0.05,
    type: "GOAL",
    tasks: [13, 14],
  },
  {
    id: 5,
    title: "Spanish language comprehension",
    progress: 0.3,
    type: "GOAL",
    tasks: [15, 16, 17],
  },
  {
    id: 6,
    title: "Spanish writing",
    progress: 0.2,
    type: "GOAL",
    tasks: [18, 19],
  },
  {
    id: 7,
    title: "Build muscle",
    progress: 0.6,
    type: "GOAL",
    tasks: [],
  },
  {
    id: 8,
    title: "Learn Linear Algebra",
    targetDate: new Date("2023-11-01"),
    progress: 0.44,
    type: "GOAL",
    tasks: [],
  },
  {
    id: 9,
    title: "Learn Calculus",
    progress: 0.8,
    type: "GOAL",
    tasks: [27, 28, 29],
  },
  {
    id: 10,
    title: 'Read "Demons" by Dostoevsky',
    progress: 0.14,
    type: "GOAL",
    tasks: [],
  },
  {
    id: 11,
    title: 'Read "The Shape of Space"',
    progress: 0,
    type: "GOAL",
    tasks: [],
  },
] as Goal[]

const tasks = [
  {
    id: 1,
    title: "Make a Figma design sketch",
    progress: 0.82,
    duration: { hours: 28, minutes: 0 },
    targetDate: new Date("2023-09-01"),
    priority: "MEDIUM",
    type: "TASK",
    goal: 1,
  },
  {
    id: 2,
    title: "Code MVP frontend",
    progress: 0.88,
    duration: { hours: 40, minutes: 0 },
    targetDate: new Date("2023-09-01"),
    priority: "HIGH",
    type: "TASK",
    goal: 1,
  },
  {
    id: 3,
    title: "Make MVP backend",
    progress: 0,
    duration: { hours: 30, minutes: 0 },
    targetDate: new Date("2023-09-01"),
    priority: "HIGH",
    type: "TASK",
    goal: 1,
  },
  {
    id: 4,
    title: "Add community page",
    progress: 0,
    duration: { hours: 40, minutes: 0 },
    type: "TASK",
    goal: 1,
  },
  {
    id: 5,
    title: "Add statistics page",
    progress: 0,
    duration: { hours: 60, minutes: 0 },
    type: "TASK",
    goal: 1,
  },
  {
    id: 6,
    title: "Add calendar page",
    progress: 0,
    duration: { hours: 50, minutes: 0 },
    type: "TASK",
    goal: 1,
  },
  {
    id: 7,
    title: "Convert the app to PWA",
    progress: 0,
    duration: { hours: 20, minutes: 0 },
    type: "TASK",
    goal: 1,
  },
  {
    id: 8,
    title: "Add PWA app to App Store & Play Store",
    progress: 0,
    duration: { hours: 15, minutes: 0 },
    type: "TASK",
    goal: 1,
  },
  {
    id: 9,
    title: "Learn common Spanish greeting phrases",
    progress: 0.8,
    duration: { hours: 10, minutes: 0 },
    type: "TASK",
    goal: 3,
  },
  {
    id: 10,
    title: "Memorize a list of essential words",
    progress: 0.9,
    duration: { hours: 10, minutes: 0 },
    type: "TASK",
    goal: 3,
  },
  {
    id: 11,
    title: "Learn Spanish pronunciation",
    progress: 0.3,
    duration: { hours: 10, minutes: 0 },
    type: "TASK",
    goal: 3,
  },
  {
    id: 12,
    title: "Memorize most popular Spanish phrases",
    progress: 0.3,
    duration: { hours: 10, minutes: 0 },
    type: "TASK",
    goal: 3,
  },
  {
    id: 13,
    title: "Learn all different tenses",
    progress: 0.1,
    duration: { hours: 18, minutes: 0 },
    type: "TASK",
    goal: 4,
  },
  {
    id: 14,
    title: "Learn sentence structure and sentence word order",
    progress: 0.1,
    duration: { hours: 22, minutes: 0 },
    type: "TASK",
    goal: 4,
  },
  {
    id: 15,
    title: "Listen to Spanish speaking",
    progress: 0.4,
    duration: { hours: 40, minutes: 0 },
    type: "TASK",
    goal: 5,
  },
  {
    id: 16,
    title: "Finish an audio course in Spanish",
    progress: 0,
    duration: { hours: 38, minutes: 0 },
    type: "TASK",
    goal: 5,
  },
  {
    id: 17,
    title: "Read The Hobbit out loud in Spanish",
    progress: 0,
    duration: { hours: 42, minutes: 0 },
    type: "TASK",
    goal: 5,
  },
  {
    id: 18,
    title: "Write letters to my Spanish pen pal",
    progress: 0.5,
    duration: { hours: 12, minutes: 0 },
    type: "TASK",
    goal: 6,
  },
  {
    id: 19,
    title: "Write essays with a total of 10000 words in Spanish",
    progress: 0.5,
    duration: { hours: 44, minutes: 0 },
    type: "TASK",
    goal: 6,
  },
  {
    id: 20,
    title: "Do weight lifting",
    type: "TASK",
    goal: 7,
    recurring: true,
  },
  {
    id: 21,
    title: "Go running",
    type: "TASK",
    goal: 7,
    recurring: true,
  },
  {
    id: 22,
    title: "Do morning yoga",
    type: "TASK",
    goal: 7,
    recurring: true,
  },
  {
    id: 23,
    title: 'Finish reading "Linear Algebra" by Lay',
    progress: 0.2,
    duration: { hours: 60, minutes: 0 },
    type: "TASK",
    goal: 8,
  },
  {
    id: 24,
    title: 'Do all exercises from "Linear Algebra" by Lay',
    progress: 0.16,
    duration: { hours: 40, minutes: 0 },
    type: "TASK",
    goal: 8,
  },
  {
    id: 25,
    title: "Watch a Linear Algebra youtube series from 3blue1brown",
    progress: 1,
    duration: { hours: 3, minutes: 0 },
    type: "TASK",
    goal: 8,
  },
  {
    id: 26,
    title: 'Read "Linear Algebra" by Shilov',
    progress: 0.01,
    duration: { hours: 55, minutes: 0 },
    type: "TASK",
    goal: 8,
  },
  {
    id: 27,
    title: 'Read "Linear Algebra Done Right" by Axler',
    progress: 0.04,
    duration: { hours: 60, minutes: 0 },
    type: "TASK",
    goal: 8,
  },
  {
    id: 28,
    title: 'Read "Calculus: The Intuitive Approach" by Kline',
    progress: 1,
    duration: { hours: 38, minutes: 0 },
    type: "TASK",
    goal: 9,
  },
  {
    id: 29,
    title: 'Do all the exercises from "Calculus" by Kline',
    progress: 1,
    duration: { hours: 26, minutes: 0 },
    type: "TASK",
    goal: 9,
  },
  {
    id: 30,
    title: "Write an article on Kline's ideas on calculus",
    progress: 0,
    duration: { hours: 8, minutes: 0 },
    type: "TASK",
    goal: 9,
  },
  {
    id: 31,
    title: "Learn all chess starting moves",
    progress: 0,
    duration: { hours: 8, minutes: 0 },
    type: "TASK",
    goal: 2,
  },
  {
    id: 32,
    title: "Watch a video course on chess",
    progress: 0,
    duration: { hours: 10, minutes: 0 },
    type: "TASK",
    goal: 2,
  },
  {
    id: 33,
    title: "Play 100 chess matches",
    progress: 0,
    duration: { hours: 50, minutes: 0 },
    type: "TASK",
    goal: 2,
  },
]

export const goalsData = goals.map(goal => {
  const filteredTasks = tasks
    .filter(task => task.goal === goal.id)
    .map(task => {
      const { goal, ...rest } = task
      return rest
    })

  return {
    ...goal,
    tasks: filteredTasks,
  }
}) as Goal[]

export const tasksData = tasks.map(task => {
  const goal = goals.find(goal => goal.id === task.goal)
  let taskGoal = undefined

  if (goal) taskGoal = goal

  return {
    ...task,
    goal: taskGoal,
  }
}) as Task[]

export const dreamsData = dreams.map(dream => {
  const filteredGoals = goals
    .filter(goal => dream.goals.includes(goal.id))
    .map(goal => {
      const { tasks, ...rest } = goal
      return rest
    })

  return {
    ...dream,
    goals: filteredGoals,
  }
}) as Dream[]
