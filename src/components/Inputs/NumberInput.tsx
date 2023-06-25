import { useRef } from "react"
import { ReactComponent as EditIcon } from "../../assets/edit.svg"

export default function NumberInput({
  id,
  value,
  setValue,
  inputName,
  label,
  icon,
  placeholder,
}: {
  id: string
  value?: string | number
  setValue: (input: string) => void
  inputName: string
  label?: string
  icon?: JSX.Element
  placeholder?: string
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
        type="number"
        min={0}
        max={99}
        className={`peer h-10 w-full rounded-2xl bg-gray-200 ${
          icon ? "pl-10" : "pl-4"
        } pr-12 text-gray-900 focus:bg-white focus:outline-2 focus:outline-blue-500/50`}
        placeholder={placeholder ?? "Aa..."}
        value={value ? Number(value) * 2 : ""}
        onChange={e => setValue((Number(e.target.value) / 2).toString())}
      />
      <div
        className="absolute right-0 bottom-2 cursor-text px-4 pl-2 text-gray-400 transition-all peer-focus:hidden"
        onClick={() => inputRef?.current?.focus()}
      >
        <EditIcon />
      </div>
      {icon && (
        <div
          className={`absolute left-0 bottom-2 cursor-text px-4 pl-2 ${
            value ? "text-gray-700" : "text-gray-400"
          } transition-all peer-focus:text-gray-700`}
          onClick={() => inputRef?.current?.focus()}
        >
          {icon}
        </div>
      )}
    </div>
  )
}
