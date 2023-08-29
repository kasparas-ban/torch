import { TimerHistoryRecord } from "@/types"
import { Time } from "@internationalized/date"

export const timerHistoryData: TimerHistoryRecord[] = [
  {
    timeSpent: { hour: 0, minute: 25, second: 0 } as Time,
    focusOn: {
      label: 'Finish reading "The Shape of Space"',
      value: 11,
      type: "GOAL",
    },
    progress: 0.33,
    difference: 0.0002,
    startTime: new Date(),
    finishTime: new Date(),
  },
  {
    timeSpent: { hour: 0, minute: 25, second: 0 } as Time,
    focusOn: {
      label: 'Finish reading "The Shape of Space"',
      value: 11,
      type: "GOAL",
    },
    progress: 0.33,
    difference: 0.03,
    startTime: new Date(),
    finishTime: new Date(),
  },
  {
    timeSpent: { hour: 0, minute: 25, second: 0 } as Time,
    focusOn: {
      label: 'Finish reading "The Shape of Space"',
      value: 11,
      type: "GOAL",
    },
    progress: 0.36,
    difference: 0.03,
    startTime: new Date(),
    finishTime: new Date(),
  },
  {
    timeSpent: { hour: 0, minute: 25, second: 0 } as Time,
    focusOn: {
      label: 'Finish reading "The Shape of Space"',
      value: 11,
      type: "GOAL",
    },
    progress: 0.39,
    difference: 0.03,
    startTime: new Date(),
    finishTime: new Date(),
  },
  {
    timeSpent: { hour: 0, minute: 25, second: 0 } as Time,
    focusOn: {
      label: 'Finish reading "The Shape of Space"',
      value: 11,
      type: "GOAL",
    },
    progress: 0.42,
    difference: 0.03,
    startTime: new Date(),
    finishTime: new Date(),
  },
]
