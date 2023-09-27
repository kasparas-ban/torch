import { FocusType } from "@/components/Timer/hooks/useTimerForm"
import {
  Dream,
  FormattedItems,
  GeneralItem,
  Goal,
  GroupedItems,
  ItemType,
  ReccuringPeriod,
  RecurringType,
  Task,
} from "../types"
import dayjs from "dayjs"

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

export type TimerHistoryResponse = {
  startTime: string
  endTime: string
  itemID: number
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
        timeSpent: goal.timeSpent,
        type: "GOAL",
        ...(goal.priority && { priority: goal.priority }),
        ...(goal.targetDate && { targetDate: goal.targetDate }),
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

export const getItemsByType = ({
  itemData,
  focusType,
  grouped,
}: {
  itemData?: { tasks: Task[]; goals: Goal[]; dreams: Dream[] }
  focusType: FocusType
  grouped?: boolean
}) => {
  const selectedItems =
    focusType === "TASKS"
      ? itemData?.tasks
      : focusType === "GOALS"
      ? itemData?.goals
      : focusType === "DREAMS"
      ? itemData?.dreams
      : [
          ...(itemData?.tasks || []),
          ...(itemData?.goals || []),
          ...(itemData?.dreams || []),
        ]

  const filteredItems =
    selectedItems?.map(item => ({
      label: item.title,
      value: item.id,
      type: item.type,
      progress: item.progress,
      timeSpent: item.timeSpent,
      totalTimeSpent: (item as Goal)?.totalTimeSpent,
      containsTasks:
        !!(item as Goal).tasks?.length ||
        !!(item as Dream).goals?.find(goal => !!goal.tasks?.length),
      duration:
        (item as Task)?.duration ||
        (item as Goal).tasks?.reduce(
          (prev, curr) => (prev += curr.duration || 0),
          0,
        ),
      parent: (item as Task).goal?.id || (item as Goal).dream?.id,
    })) || []

  if (grouped) {
    if (focusType === "ALL" || focusType === "DREAMS") return filteredItems

    const parents =
      focusType === "TASKS"
        ? (itemData?.goals || []).filter(goal =>
            filteredItems.find(item => item.parent === goal.id),
          )
        : (itemData?.dreams || []).filter(dream =>
            filteredItems.find(item => item.parent === dream.id),
          )

    const groupedItems = parents.map(parent => ({
      label: parent.title,
      value: parent.id,
      options: filteredItems.filter(item => item.parent === parent.id),
    }))

    return groupedItems
  }

  return filteredItems
}

export const findItemByID = (
  itemID: number,
  formattedItems: FormattedItems,
) => {
  let item
  item = formattedItems.dreams.find(item => item.id === itemID)
  if (item) return item

  item = formattedItems.goals.find(item => item.id === itemID)
  if (item) return item

  item = formattedItems.tasks.find(item => item.id === itemID)
  if (item) return item
}

export const formatTimerHistory = (
  timerData: TimerHistoryResponse[],
  formattedItems: FormattedItems,
) => {
  const formattedData = timerData.map(record => {
    const timeSpent = dayjs(record.endTime).diff(
      dayjs(record.startTime),
      "seconds",
    )

    const item = findItemByID(record.itemID, formattedItems)

    let progressDifference
    if ((item as Task).duration) {
      const duration = (item as Task).duration
      progressDifference = duration ? timeSpent / duration : undefined
      console.log("duration", duration, progressDifference, timerData)
    } else {
      const totalDuration = (item as Goal).tasks?.reduce(
        (prev, curr) => (prev += curr.duration || 0),
        0,
      )
      progressDifference = totalDuration ? timeSpent / totalDuration : undefined
    }

    return {
      focusOn: item
        ? {
            value: record.itemID,
            label: item.title,
            type: item.type,
          }
        : undefined,
      startTime: dayjs(record.startTime).format("HH:mm A"),
      finishTime: dayjs(record.endTime).format("HH:mm A"),
      progress: item?.progress,
      progressDifference,
      timeSpent,
    }
  })

  return formattedData
}
