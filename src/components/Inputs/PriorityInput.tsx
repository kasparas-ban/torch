export type PriorityType = "LOW" | "MEDIUM" | "HIGH"

export default function PriorityInput({
  id,
  value,
  setValue,
}: {
  id: string
  value?: PriorityType
  setValue: (input: PriorityType) => void
}) {
  return (
    <>
      <label
        htmlFor="priority"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Priority
      </label>
      <ul className="grid w-full gap-2 min-[400px]:grid-cols-3">
        <li onClick={() => setValue("LOW")}>
          <input
            type="radio"
            id={`${id}_low`}
            value="LOW"
            className="peer hidden"
            checked={value === "LOW"}
            readOnly
          />
          <label
            htmlFor={`${id}_low`}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            Low
          </label>
        </li>
        <li onClick={() => setValue("MEDIUM")}>
          <input
            type="radio"
            id={`${id}_medium`}
            value="MEDIUM"
            checked={value === "MEDIUM"}
            className="peer hidden"
            readOnly
          />
          <label
            htmlFor={`${id}_medium`}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            Medium
          </label>
        </li>
        <li onClick={() => setValue("HIGH")}>
          <input
            type="radio"
            id={`${id}_high`}
            value="HIGH"
            checked={value === "HIGH"}
            className="peer hidden"
            readOnly
          />
          <label
            htmlFor={`${id}_high`}
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 bg-gray-200 py-1.5 text-gray-500 shadow-sm hover:border-gray-300 hover:bg-gray-300 hover:text-gray-600 peer-checked:border-blue-300 peer-checked:bg-blue-300 peer-checked:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            High
          </label>
        </li>
      </ul>
    </>
  )
}
