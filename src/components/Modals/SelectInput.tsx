import classNames from "classnames"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import Select, { Props, GroupBase } from "react-select"

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>

const cache = createCache({
  key: "with-tailwind",
  insertionPoint: document.querySelector("title")!,
})

const styles = {
  dropdownIndicator: (provided: any) => ({
    ...provided,
    svg: {
      fill: "rgb(156, 163, 175)",
    },
  }),
}

export const SelectField = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  return (
    <CacheProvider value={cache}>
      <Select
        {...props}
        classNames={{
          control: ({ isFocused }) =>
            classNames(
              "h-10 w-full rounded-2xl bg-gray-200 px-2 text-gray-900 border-none",
              isFocused &&
                "!shadow-none !border-none !outline-2 !outline !outline-blue-500/50 bg-white"
            ),
        }}
        styles={styles}
      />
    </CacheProvider>
  )
}

export default SelectField
