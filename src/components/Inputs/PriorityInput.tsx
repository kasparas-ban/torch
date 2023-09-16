import { useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export default function PriorityInput({
  id,
  setValue,
  register,
}: {
  id: string
  setValue: (input: PriorityType) => void
  register: any
}) {
  return (
    <fieldset>
      <ul className="grid w-full gap-2 min-[400px]:grid-cols-3">
        <li>
          <input
            type="radio"
            id={`${id}_low`}
            value="LOW"
            className="peer hidden"
            readOnly
            {...register("priority")}
          />
          <label
            htmlFor={`${id}_low`}
            className="focus:ring-ring inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 focus:ring-2 peer-checked:border-gray-400 peer-checked:bg-gray-400 peer-checked:text-white peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setValue("LOW")}
          >
            Low
          </label>
        </li>
        <li>
          <input
            type="radio"
            id={`${id}_medium`}
            value="MEDIUM"
            className="peer hidden"
            readOnly
            defaultChecked
            {...register("priority")}
          />
          <label
            htmlFor={`${id}_medium`}
            className="focus:ring-ring inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 focus:ring-2 peer-checked:border-gray-400 peer-checked:bg-gray-400 peer-checked:text-white peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setValue("MEDIUM")}
          >
            Medium
          </label>
        </li>
        <li>
          <input
            type="radio"
            id={`${id}_high`}
            value="HIGH"
            className="peer hidden"
            readOnly
            tabIndex={0}
            {...register("priority")}
          />
          <label
            htmlFor={`${id}_high`}
            className="focus:ring-ring inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 focus:ring-2 peer-checked:border-gray-400 peer-checked:bg-gray-400 peer-checked:text-white peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setValue("HIGH")}
          >
            High
          </label>
        </li>
      </ul>
    </fieldset>
  )
}

export function PriorityInputNew({
  value,
  onChange,
}: {
  value?: PriorityType
  onChange: (value: PriorityType) => void
}) {
  useEffect(() => {
    if (!value) onChange("MEDIUM")
  }, [])

  return (
    <motion.div layout>
      <Tabs defaultValue={value || "MEDIUM"} className="w-full">
        <TabsList className="w-full rounded-2xl bg-gray-200">
          <TabsTrigger
            value="LOW"
            className="w-full rounded-xl"
            onClick={() => onChange("LOW")}
          >
            Low
          </TabsTrigger>
          <TabsTrigger
            value="MEDIUM"
            className="w-full rounded-xl"
            onClick={() => onChange("MEDIUM")}
          >
            Medium
          </TabsTrigger>
          <TabsTrigger
            value="HIGH"
            className="w-full rounded-xl"
            onClick={() => onChange("HIGH")}
          >
            High
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  )
}
