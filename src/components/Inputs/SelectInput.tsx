import SelectField from "./SelectField"

const SelectInput = <T,>({
  item,
  setItem,
  name,
  options = [],
}: {
  item: { label: string; value: T } | null
  setItem: (item: { label: string; value: T } | null) => void
  name: string
  options: { label: string; value: T }[]
}) => {
  return (
    <div className="relative w-full">
      <SelectField
        name={name}
        value={item}
        onChange={option => setItem(option)}
        options={options}
        isClearable
        menuPosition="fixed"
      />
    </div>
  )
}

export default SelectInput
