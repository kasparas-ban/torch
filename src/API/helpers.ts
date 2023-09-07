import {
  Dream,
  GeneralItem,
  Goal,
  GroupedItems,
  ItemType,
  ReccuringPeriod,
  RecurringType,
  Task,
} from "../types"

export type ItemResponse = {
  itemID: number
  title: string
  type: ItemType
  targetDate: string | null
  priority: "LOW" | "MEDIUM" | "HIGH" | null
  duration: number | null
  recurring: {
    times: number
    period: ReccuringPeriod | "" | null
    progress: number
  }
  parentID: number
  timeSpent: number
  createdAt: number
}

export const groupItemsByParent = (
  items: GeneralItem[],
  itemType: ItemType,
) => {
  let response = {} as
    | GroupedItems<Goal>
    | GroupedItems<Task>
    | GroupedItems<Dream>
  if (itemType === "GOAL") {
    const groupedItems = (items as Goal[]).reduce((prev, curr) => {
      const dreamTitle = curr.dream?.title || "Other"
      const groupLabel = curr.dream?.id || "other"
      const groupedGoals = prev[groupLabel]?.items || []

      return {
        ...prev,
        [groupLabel]: {
          parentLabel: dreamTitle,
          items: [...groupedGoals, curr],
        },
      }
    }, {} as GroupedItems<Goal>)

    response = groupedItems
  } else if (itemType === "TASK") {
    const groupedItems_1 = (items as Task[]).reduce((prev_1, curr_1) => {
      const goalTitle = curr_1.goal?.title || "Other"
      const groupLabel_1 = curr_1.goal?.id || "other"
      const groupedTasks = prev_1[groupLabel_1]?.items || []

      return {
        ...prev_1,
        [groupLabel_1]: {
          parentLabel: goalTitle,
          items: [...groupedTasks, curr_1],
        },
      }
    }, {} as GroupedItems<Task>)

    response = groupedItems_1
  } else if (itemType === "DREAM") {
    response = { empty: { items: items as Dream[] } }
  }
  return response
}

export const formatItemResponse = (response: ItemResponse[]) => {
  const tasks = response
    .filter(item => item.type === "TASK")
    .map(task => {
      const goal = response.find(item => item.itemID === task.parentID)
      const progress = getProgress(task.timeSpent, task.duration)

      return {
        id: task.itemID,
        title: task.title,
        progress,
        type: "TASK",
        duration: task.duration,
        ...(task.priority && { priority: task.priority }),
        ...(task.targetDate && { targetDate: task.targetDate }),
        ...((task.recurring as RecurringType)?.times && {
          recurring: task.recurring,
        }),
        timeSpent: task.timeSpent,
        ...(task.parentID &&
          goal && {
            goal: {
              id: goal.itemID,
              title: goal.title,
              type: "GOAL",
              ...(goal.priority && { priority: goal.priority }),
              ...(goal.targetDate && { targetDate: goal.targetDate }),
              timeSpent: goal.timeSpent,
            },
          }),
      }
    }) as Task[]

  const goals = response
    .filter(item => item.type === "GOAL")
    .map(goal => {
      const dream = response.find(item => item.itemID === goal.parentID)
      const tasks = response
        .filter(item => item.parentID === goal.itemID)
        .map(task => ({
          id: task.itemID,
          title: task.title,
          progress: getProgress(task.timeSpent, task.duration),
          type: "TASK",
          duration: task.duration,
          ...(task.priority && { priority: task.priority }),
          ...(task.targetDate && { targetDate: task.targetDate }),
          ...((task.recurring as RecurringType)?.times && {
            recurring: task.recurring,
          }),
          timeSpent: task.timeSpent,
        }))

      const progressInfo = {
        totalDuration: tasks.reduce(
          (prev, curr) => (prev += curr.duration || 0),
          0,
        ),
        timeSpent: tasks.reduce((prev, curr) => (prev += curr.timeSpent), 0),
      }

      return {
        id: goal.itemID,
        title: goal.title,
        progress: getProgress(
          progressInfo.timeSpent,
          progressInfo.totalDuration,
        ),
        totalTimeSpent: goal.timeSpent + progressInfo.timeSpent,
        type: "GOAL",
        ...(goal.priority && { priority: goal.priority }),
        ...(goal.targetDate && { targetDate: goal.targetDate }),
        timeSpent: goal.timeSpent,
        ...(goal.parentID &&
          dream && {
            dream: {
              id: dream.itemID,
              title: dream.title,
              type: "DREAM",
              ...(dream.priority && { priority: dream.priority }),
              ...(dream.targetDate && { targetDate: dream.targetDate }),
              timeSpent: goal.timeSpent,
            },
          }),
        tasks,
      }
    }) as Goal[]

  const dreams = response
    .filter(item => item.type === "DREAM")
    .map(dream => {
      const dreamGoals = goals
        .filter(goal => goal.dream?.id === dream.itemID)
        .map(goal => {
          const { dream, ...rest } = goal
          return rest
        })

      const progressInfo = {
        totalDuration: dreamGoals.reduce(
          (prev, curr) =>
            (prev +=
              curr.tasks?.reduce(
                (taskTotal, task) => (taskTotal += task.duration || 0),
                0,
              ) || 0),
          0,
        ),
        timeSpent: dreamGoals.reduce(
          (prev, curr) =>
            (prev +=
              curr.tasks?.reduce(
                (taskTotal, task) => (taskTotal += task.timeSpent || 0),
                0,
              ) || 0),
          0,
        ),
      }

      return {
        id: dream.itemID,
        title: dream.title,
        progress: getProgress(
          progressInfo.timeSpent,
          progressInfo.totalDuration,
        ),
        type: "DREAM",
        ...(dream.priority && { priority: dream.priority }),
        ...(dream.targetDate && { targetDate: dream.targetDate }),
        timeSpent: dream.timeSpent,
        totalTimeSpent: dream.timeSpent + progressInfo.timeSpent,
        goals: dreamGoals,
      }
    }) as Dream[]

  return { tasks, goals, dreams }
}

const getProgress = (timeSpent: number, duration: number | null) => {
  const progress = duration
    ? Math.round((timeSpent / duration) * 1000) / 1000
    : 0
  return progress > 1 ? 1 : progress
}
