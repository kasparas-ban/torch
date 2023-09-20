import { useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export default function PriorityInput({
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
