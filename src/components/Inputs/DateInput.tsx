import { useRef } from "react"

export default function DateInputLegacy({
  value,
  setValue,
}: {
  value?: Date | null
  setValue: (input: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <input
      ref={inputRef}
      type="date"
      min={new Date().toLocaleDateString("en-CA")}
      className={`${
        value ? "text-gray-900" : "empty-date"
      } peer h-10 w-full cursor-text rounded-2xl bg-gray-200 px-4  focus:bg-white focus:outline-2 focus:outline-blue-500/50`}
      onFocus={e => e.target.showPicker()}
      onClick={e => (e.target as HTMLInputElement).showPicker()}
      onChange={e => setValue(e.target.value)}
      value={value === null ? "" : value?.toLocaleDateString("en-CA")}
    />
  )
}
