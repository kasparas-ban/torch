import { useRef } from "react"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"

export default function TextInput({
  id,
  value,
  setValue,
  inputName,
  label,
}: {
  id: string
  value?: string
  setValue: (input: string) => void
  inputName: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="cursor-text px-4 text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm peer-focus:text-sm peer-focus:text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={inputName}
        ref={inputRef}
        type="text"
        className="peer h-10 w-full rounded-2xl bg-gray-200 pl-4 pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50"
        placeholder="Aa..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
    </div>
  )
}
