import { useRef } from "react"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"

export default function DateInput({
  id,
  value,
  setValue,
}: {
  id: string
  value?: Date | null
  setValue: (input: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <label
        htmlFor="target_date_input"
        className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
      >
        Target date
      </label>
      <input
        id={id}
        name={`${id}_name`}
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
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
    </>
  )
}
