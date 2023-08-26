import { z } from "zod"

export const dreamFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be longer than 2 characters." })
    .max(50, { message: "Title must be shorter than 50 characters." }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  targetDate: z.date().nullable().optional(),
})

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be longer than 2 characters." })
    .max(50, { message: "Title must be shorter than 50 characters." }),
  duration: z
    .object({
      hours: z.number().nullable(),
      minutes: z.number().nullable(),
    })
    .optional(),
  goal: z
    .object({
      label: z.string(),
      options: z.array(z.object({ label: z.string(), value: z.number() })),
    })
    .optional(),
  targetDate: z.date().nullable().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  recurring: z
    .object({
      times: z.number(),
      period: z.enum(["DAY", "WEEK", "MONTH"]),
      progress: z.number().optional(),
    })
    .optional(),
})

export const goalFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be longer than 2 characters." })
    .max(50, { message: "Title must be shorter than 50 characters." }),
  dream: z.object({ label: z.string(), value: z.number() }).optional(),
  targetDate: z.date().nullable().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  tasks: z.array(taskFormSchema.omit({ goal: true })),
})

const subtaskFormSchema = taskFormSchema.extend({ id: z.number() })
export type SubitemType = z.infer<typeof subtaskFormSchema>
export type SubitemKeyType = keyof SubitemType
