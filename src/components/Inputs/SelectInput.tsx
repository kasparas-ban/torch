import SelectField from "./SelectField"

export default function SelectInput<T>({
  id,
  item,
  setItem,
  label,
  options = [],
}: {
  id: string
  item: { label: string; value: T } | null
  setItem: (item: { label: string; value: T } | null) => void
  label?: string
  options: { label: string; value: T }[]
}) {
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
      <SelectField
        value={item}
        onChange={option => setItem(option)}
        options={options}
        isClearable
      />
    </div>
  )
}
