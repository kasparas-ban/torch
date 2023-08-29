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

export const accountFormSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must contain at least 5 characters" })
    .max(20, { message: "Username cannot exceed 20 characters" }),
  birthday: z.date().optional(),
  gender: z
    .union([
      z.object({ label: z.literal("Male"), value: z.literal("MALE") }),
      z.object({ label: z.literal("Female"), value: z.literal("FEMALE") }),
    ])
    .optional(),
  country: z.object({ label: z.string(), value: z.string() }).optional(),
})

export const emailFormSchema = z.object({ email: z.string().email() })

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must be less than 30 characters" })
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).*$/, {
        message:
          "Password must contain at least one number and both lowercase and uppercase characters",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
